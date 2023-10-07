import { DataTypes } from "sequelize";
export const Permission = (sequelize) => {
  const Permission = sequelize.define("permission", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    is_view: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_edit: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_add: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
    
  });
  return Permission;
};
