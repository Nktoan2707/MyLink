import { DataTypes } from "sequelize";
export const Employee = (sequelize) => {
  const Employee = sequelize.define("employee", {
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
    position: {
        type: DataTypes.STRING
    },
    salary: {
        type: DataTypes.DOUBLE
    },
    insurance_information: {
        type: DataTypes.STRING
    },
    start_date: {
        type: DataTypes.DATE
    },
    company_tenture: {
        type: DataTypes.INTEGER
    }
  });
  return Employee;
};
