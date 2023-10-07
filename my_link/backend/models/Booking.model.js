import { DataTypes } from "sequelize";
export const Booking = (sequelize) => {
  const Booking = sequelize.define("booking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    total_money: {
        type: DataTypes.DOUBLE
    },
    rating: {
      type: DataTypes.DOUBLE
    },
    id_city: {
      type: DataTypes.STRING
    },
    source_booking: {
        type: DataTypes.STRING
    },
    destination_booking: {
        type: DataTypes.STRING
    }
  });
  return Booking;
};
