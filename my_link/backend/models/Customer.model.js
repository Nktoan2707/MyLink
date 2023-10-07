import { DataTypes } from "sequelize";
export const Customer = (sequelize) => {
  const Customer = sequelize.define("customer", {
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
    }
  });
  return Customer;
};
