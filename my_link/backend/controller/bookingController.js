import bookingService from "../services/bookingService";
import { changeAddressToLongtitudeAndLatitude, connectToRabbitMQ } from "../utils/common";
import {
  BOOKING_STATUS,
  COMPLETE_LOCATING,
  COMPLETE_LOCATING_QUEUE,
  COORDINATING_CAR_BOOKING,
  LOCATING,
  ROUTING,
} from "../utils/constant";
import db from "../utils/db";
const { BookingInfo, HistoryAddressBooking } = db;
export default {
  addBooking: async (req, res) => {
    let idCar = "";
    try {
      const data = req.body;
      const { customer, address, phone, destination, price, distance } = data;

      const isCoordinatedBefore = await bookingService.isCoordinatedBefore(address);
      const chanel = await connectToRabbitMQ();

      if (isCoordinatedBefore) {
        const pickupLocation = await HistoryAddressBooking.findOne({
          where: { address },
          attributes: ["longitude", "latitude"],
        });
        console.log("🚀 ~ file: bookingController.js:27 ~ addBooking: ~ pickupLocation:", pickupLocation);

        const destinationLocation = await changeAddressToLongtitudeAndLatitude(destination);

        // điều phối,
        await chanel.assertExchange(COORDINATING_CAR_BOOKING, "fanout", { durable: false });
        const carInfo = await BookingInfo.create({
          customer,
          address,
          phone,
          status: BOOKING_STATUS.PENDING,
          pickupLocationLong: pickupLocation.longitude,
          pickupLocationLat: pickupLocation.latitude,
          tripFare: price,
          distance: distance,
          destinationName: destination,
          destinationLocationLong: destinationLocation.longitude,
          destinationLocationLat: destinationLocation.latitude,
        });
        idCar = carInfo.id;
        console.log("🚀 ~Điều phối luôn:  file: bookingController.js:31 ~ addBooking: ~ carInfo:", carInfo.id);
        chanel.publish(
          COORDINATING_CAR_BOOKING,
          "",
          Buffer.from(
            JSON.stringify({
              id: carInfo.id,
              status: carInfo.status,
              pickupName: address,
              pickupLocation: { longitude: pickupLocation.longitude, latitude: pickupLocation.latitude },
              destinationName: destination,
              destinationLocation: { longitude: destinationLocation.longitude, latitude: destinationLocation.latitude },
              phone,
              clientId: customer,
              tripFare: price,
              distanceKm: distance,
            })
          )
        );
      } else {
        // Gửi địa chỉ cần định vị từ s1 để xử lý
        await chanel.assertExchange(LOCATING, "direct", { durable: false });
        chanel.publish(
          LOCATING,
          ROUTING.locating,
          Buffer.from(JSON.stringify({ address: address, customer, phone, destination }))
        );
        console.log(" [x] Sent %s");

        await chanel.assertExchange(COMPLETE_LOCATING, "direct", { durable: false });
        await chanel.assertQueue(COMPLETE_LOCATING_QUEUE);
        await chanel.bindQueue(COMPLETE_LOCATING_QUEUE, COMPLETE_LOCATING, ROUTING.completeLocating);
        const { consumerTag } = await chanel.consume(COMPLETE_LOCATING_QUEUE, (msg) => {
          console.log("Complete: ", msg.content);
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      return res.status(200).json({
        id: idCar,
        tripFare: 50,
        distance: 10,
        message: "Add booking car successfully",
      });
    }
  },
};
