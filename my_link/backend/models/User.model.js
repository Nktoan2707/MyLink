import { DataTypes } from "sequelize";
export const User = (sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    status_account: {
      type: DataTypes.BOOLEAN
    },
    status_online: {
      type: DataTypes.BOOLEAN
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    dateofbirth: {
      type: DataTypes.DATE,
    },
    sex: {
      type: DataTypes.BOOLEAN,
    },
  });
  return User;
};
