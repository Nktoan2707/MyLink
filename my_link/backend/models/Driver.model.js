import { DataTypes } from "sequelize";
export const Driver = (sequelize) => {
  const Driver = sequelize.define("driver", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING
    },
    car_license_number: {
        type: DataTypes.STRING
    },
    car_vehicle_registering: {
        type: DataTypes.STRING
    },
    banking_number: {
        type: DataTypes.STRING
    },
    insurance_info: {
        type: DataTypes.STRING
    },
    start_date: {
        type: DataTypes.DATE
    },
    company_tenture: {
        type: DataTypes.INTEGER
    },
    total_rating: {
        type: DataTypes.DOUBLE
    }
  });
  return Driver;
};
