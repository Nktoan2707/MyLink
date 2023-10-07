const express = require("express");
import amqplib from "amqplib";
const os = require("os");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.LOCATE_SERVER_PORT || 8080;
const app = express();
const cors = require("cors");
import db from "./utils/db";
import { changeAddressToLongtitudeAndLatitude, connectToRabbitMQ } from "./utils/common";
import {
  BOOKING_STATUS,
  COMPLETE_LOCATING,
  COORDINATING_CAR_BOOKING,
  LOCATING,
  LOCATING_QUEUE,
  ROUTING,
} from "./utils/constant";

const corsOptions = {
  origin: "http://localhost:8082",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

app.use(errorHandler);

connectToRabbitMQ().then(async (chanel) => {
  await chanel.assertExchange(LOCATING, "direct", { durable: false });
  await chanel.assertQueue(LOCATING_QUEUE);
  await chanel.bindQueue(LOCATING_QUEUE, LOCATING, ROUTING.locating);
  console.log(` [locateServer] Waiting for messages with routing key info. To exit, press CTRL+C`);
  const { consumerTag } = await chanel.consume(
    LOCATING_QUEUE,
    async (msg) => {
      console.log(` [x] Received '${msg.content.toString()}'`);
      const { address, customer, phone, destination } = JSON.parse(msg.content);
      const { latitude, longitude } = await changeAddressToLongtitudeAndLatitude(address);
      const destinationLocation = await changeAddressToLongtitudeAndLatitude(destination);

      const { HistoryAddressBooking, BookingInfo } = db;
      await HistoryAddressBooking.create({
        address,
        longitude,
        latitude,
      });

      // Điều phối
      await chanel.assertExchange(COORDINATING_CAR_BOOKING, "fanout", { durable: false });
      const carInfo = await BookingInfo.create({
        customer,
        address,
        phone,
        status: BOOKING_STATUS.PENDING,
        pickupLocationLong: longitude,
        pickupLocationLat: latitude,
        tripFare: 50,
        distance: 10,
        destinationName: destination,
        destinationLocationLong: destinationLocation.longitude,
        destinationLocationLat: destinationLocation.latitude,
      });
      console.log("🚀 ~ điều phối tại location file: locateServer.js:60 ~ carInfo:", carInfo.id);
      chanel.publish(COORDINATING_CAR_BOOKING, "", Buffer.from(JSON.stringify({ message: "Send to app mobile" }))); // gửi cho tài xế
      await chanel.assertExchange(COMPLETE_LOCATING, "direct", { durable: false });
      chanel.publish(
        COMPLETE_LOCATING,
        ROUTING.completeLocating,
        Buffer.from(
          JSON.stringify({
            id: carInfo.id,
            status: carInfo.status,
            pickupName: address,
            pickupLocation: { longitude: longitude, latitude: latitude },
            destinationName: destination,
            destinationLocation: { longitude: destinationLocation.longitude, latitude: destinationLocation.latitude },
            phone,
            clientId: customer,
            tripFare: 50,
            distanceKm: 10,
          })
        )
      );
      console.log(" [x] Sent %s");
    },
    { noAck: true }
  );
});

//add {force: true} to force drop and resync db
db.sequelize.sync().then(() => {
  console.log("Connect to db successfully");
  // initial();
});
app.listen(port, () => {
  console.log("Locate server running at http://" + os.hostname() + ":" + port);
});
