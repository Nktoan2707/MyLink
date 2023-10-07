import { DataTypes } from "sequelize";
export const BookingInfo = (sequelize) => {
  const BookingInfo = sequelize.define("booking_info", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer: {
      // Ten khach hang
      type: DataTypes.STRING,
    },
    address: {
      // pickup name
      // dia chi don
      type: DataTypes.STRING,
    },
    pickupLocationLong: {
      type: DataTypes.DOUBLE,
    },
    pickupLocationLat: {
      type: DataTypes.DOUBLE,
    },
    phone: {
      // so dien thoai
      type: DataTypes.STRING,
    },
    status: {
      // trang thai cuoc xe
      type: DataTypes.INTEGER,
    },
    tripFare: {
      type: DataTypes.DOUBLE,
    },
    distance: {
      type: DataTypes.DOUBLE,
    },
    driverId: {
      type: DataTypes.INTEGER,
    },
    destinationName: {
      type: DataTypes.STRING,
    },
    destinationLocationLong: {
      type: DataTypes.DOUBLE,
    },
    destinationLocationLat: {
      type: DataTypes.DOUBLE,
    },
    currentDriverLocationLong: {
      type: DataTypes.DOUBLE,
    },
    currentDriverLocationLat: {
      type: DataTypes.DOUBLE,
    },
  });

  return BookingInfo;
};
