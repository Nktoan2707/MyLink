import { DataTypes } from "sequelize";
export const Admin = (sequelize) => {
  const Admin = sequelize.define("admin", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
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
    quotes: {
        type: DataTypes.STRING
    }
  });
  return Admin;
};
