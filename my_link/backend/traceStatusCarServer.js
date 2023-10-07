const express = require("express");
import amqplib from "amqplib";
const os = require("os");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.TRACE_STATUS_CAR_PORT || 8082;
import apiRoutes from "./routes";
const app = express();
const cors = require("cors");
import db from "./utils/db";
import { connectToRabbitMQ } from "./utils/common";
import { ROUTING, SEND_TO_USER, TRACING, TRACING_QUEUE } from "./utils/constant";

const Role = db.Role;
const corsOptions = {
  origin: "http://localhost:8083",
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
  // Nghe từ app tài xế
  await chanel.assertExchange(TRACING, "direct", { durable: false });
  await chanel.assertQueue(TRACING_QUEUE);
  await chanel.bindQueue(TRACING_QUEUE, TRACING, ROUTING.tracing);
  console.log(` [TraceStatusCarServer] Waiting for messages with routing key info. To exit, press CTRL+C`);
  const { consumerTag } = await chanel.consume(
    TRACING_QUEUE,
    async (msg) => {
      console.log(` [x] Received ALOOOOOOOOOO'${msg.content.toString()}'`);
      // status cuoc xe lấy từ app tài xế (Tài xế chấp nhận/không)
      const { driverId, longitude, latitude, id } = JSON.parse(msg.content);
      const { BookingInfo } = db;
      console.log("ALOOO123123123", id, longitude, latitude);
      // Cập nhập trạng thái của cuốc xe khi tài xế hủy/chấp nhận/đang di chuyển
      await BookingInfo.update(
        {
          currentDriverLocationLong: longitude,
          currentDriverLocationLat: latitude,
        },
        {
          where: {
            id,
          },
        }
      );

      // Chuyển thông tin đến user đặt xe
      await chanel.assertExchange(SEND_TO_USER, "direct", {
        durable: false,
      });
      chanel.publish(
        SEND_TO_USER,
        ROUTING.sendToUser,
        Buffer.from(JSON.stringify({ driverId, longitude, latitude, id }))
      );
    },
    { noAck: true }
  );
});

// add {force: true} to force drop and resync db
db.sequelize.sync().then(() => {
  console.log("Connect to db successfully");
  // initial();
});
app.listen(port, () => {
  console.log("App server running at http://" + os.hostname() + ":" + port);
});
