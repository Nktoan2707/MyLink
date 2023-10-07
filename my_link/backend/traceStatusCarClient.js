const express = require("express");
import amqplib from "amqplib";
const os = require("os");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.TRACE_STATUS_CAR_PORT_CLI || 8083;
import apiRoutes from "./routes";
const app = express();
const cors = require("cors");
import db from "./utils/db";
import { connectToRabbitMQ } from "./utils/common";
import { RECEIVE_FROM_USER, ROUTING, SEND_TO_USER, TRACING, TRACING_QUEUE } from "./utils/constant";

const Role = db.Role;
const corsOptions = {
  origin: "http://localhost:8084",
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
  console.log(` [TraceStatusCarClient] Waiting for messages with routing key info. To exit, press CTRL+C`);
  const { consumerTag } = await chanel.consume(
    TRACING_QUEUE,
    async (msg) => {
      console.log(` [x] Received '${msg.content.toString()}'`);
      // status cuoc xe lấy từ app tài xế (Tài xế chấp nhận/không)
      const { status, id } = JSON.parse(msg.content);
      const { BookingInfo } = db;
      // Cập nhập trạng thái của cuốc xe khi tài xế hủy/chấp nhận/đang di chuyển
      const bookingCarInfo = await BookingInfo.findByPk(id);
      bookingCarInfo.status = status;
      await bookingCarInfo.save();

      // Chuyển thông tin đến app tài xế
      await chanel.assertExchange(RECEIVE_FROM_USER, "direct", { durable: false });
      chanel.publish(
        RECEIVE_FROM_USER,
        ROUTING.receiveFromUser,
        Buffer.from(JSON.stringify({ message: "Status của xe" }))
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
