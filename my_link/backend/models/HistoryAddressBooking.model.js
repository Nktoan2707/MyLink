import { DataTypes } from "sequelize";
export const HistoryAddressBooking = (sequelize) => {
  const HistoryAddressBooking = sequelize.define("history_address_booking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
  });
  return HistoryAddressBooking;
};
