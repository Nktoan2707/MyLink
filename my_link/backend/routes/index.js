const express = require("express");

const {
  userAPI,
  bookingAPI,
  driverAPI,
  authAPI,
  statisticsAPI,
  adminAPI,
  employeeAPI,
  customerAPI,
  statusCarAPI,
} = require("../api");

const { API_PREFIX } = require("../utils/constant");
export default (app) => {
  const router = express.Router();
  userAPI(router);
  authAPI(router);
  bookingAPI(router);

  employeeAPI(router);
  statisticsAPI(router);
  driverAPI(router);
  adminAPI(router);
  customerAPI(router);

  statusCarAPI(router);

  app.use(API_PREFIX, router);
};
