import bookingController from "../controller/bookingController";

export default function bookingAPI(app) {
  app.post("/booking", bookingController.addBooking);
}
