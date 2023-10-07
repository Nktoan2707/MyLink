const express = require("express");
import amqplib from "amqplib";
const os = require("os");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 8080;
import apiRoutes from "./routes";
const app = express();

const cors = require("cors");
import db from "./utils/db";

const Role = db.Role;
const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:8081"],
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

apiRoutes(app);
app.use(errorHandler);
// function initial() {
//   Role.create({
//     id: 1,
//     name: "employee",
//   });
//   Role.create({
//     id: 2,
//     name: "admin",
//   });
// }

// add {force: true} to force drop and resync db
db.sequelize.sync().then(() => {
  console.log("Connect to db successfully");
  // initial();
});
app.listen(port, () => {
  console.log("App server running at http://" + os.hostname() + ":" + port);
});
