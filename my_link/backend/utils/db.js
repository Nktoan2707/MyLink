
import config from "../config/db.config";
import Sequelize from "sequelize";
import { User, Role, BookingInfo, Admin, Customer, Driver, Booking, Employee, Permission } from "../models";
import { HistoryAddressBooking } from "../models/HistoryAddressBooking.model";
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

console.log(config.host)

const db = {
  sequelize: sequelize,
  User: User(sequelize),
  Role: Role(sequelize),
  BookingInfo: BookingInfo(sequelize),
  HistoryAddressBooking: HistoryAddressBooking(sequelize),
  Admin: Admin(sequelize),
  Employee: Employee(sequelize),
  Customer: Customer(sequelize),
  Driver: Driver(sequelize),
  Booking: Booking(sequelize),
  Permission: Permission(sequelize),
  ROLES: ["employee", "admin", "customer", "driver"],
};

db.Role.belongsToMany(db.User, {
	through: 'user_roles',
});
db.User.belongsToMany(db.Role, {
	through: 'user_roles',
});

const UserRoles = sequelize.define('user_roles');
db['UserRoles'] = UserRoles;

db.Employee.belongsTo(db.User, {
  foreignKey: 'id_user', // Cột trong bảng Employee
});


db.Admin.belongsTo(db.User, {
  foreignKey: 'id_user',
})

db.Driver.belongsTo(db.User, {
  foreignKey: 'id_user',
})

db.Customer.belongsTo(db.User, {
  foreignKey: 'id_user',
})

db.Booking.belongsTo(db.Customer, { foreignKey: 'id_customer' });
db.Booking.belongsTo(db.Driver, { foreignKey: 'id_driver' });
db.Customer.hasMany(db.Booking, { foreignKey: 'id_customer' });
db.Driver.hasMany(db.Booking, { foreignKey: 'id_driver' });

db.User.belongsToMany(db.Permission, { through: "user_permissions" });
db.Permission.belongsToMany(db.User, { through: "user_permissions" })

export default db;
