import backendAPI from "../utils/backendAPI";

export default {
  bookingCar: (data) => backendAPI.post("/booking", data),
};
