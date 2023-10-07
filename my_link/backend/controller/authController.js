import db from "../utils/db";
import authConfig from "../config/auth.config";
import jwt from "jsonwebtoken";
import bycript from "bcryptjs";
import asyncHandler from "express-async-handler";
const { Op } = require("sequelize");

const { User, Role, Employee, Admin, Driver, Customer, Booking, Permission } = db;

export const signup = asyncHandler(async (req, res) => {
  const { password, username, email, roles } = req.body;
  const _roles = JSON.parse(roles);

  console.log(password, username, email, roles)

  try {
    const newUser = await User.create({
      username,
      email,
      password: bycript.hashSync(password, 12),
      status_account: true,
      status_online: false,
      firstname: '',
      lastname: ''
    });

    const userId = newUser.id;
    console.log(userId)
    if (_roles) {
      const signUpRole = await Role.findAll({
        where: {
          name: {
            [Op.or]: _roles,
          },
        },
      });
      await newUser.setRoles(signUpRole);
      
      if(_roles[0] === 'admin') {
        await Admin.create({ id_user: userId })
      } else if(_roles[0] === 'employee') {
        await Employee.create({ id_user: userId })
      } else if(_roles[0] === 'driver') {
        await Driver.create({ id_user: userId })
      } else if(_roles[0] === 'customer') {
        await Customer.create({ id_user: userId })
      }

      return res.status(200).json({
        message: "User was registered successfully!",
      });
    } else {
      await newUser.setRoles([1]);
      res.status(200).json({
        message: "User was registered successfully!",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});
export const signin = asyncHandler(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { username, password } = req.body;
  console.log("🚀 ~ file: authController.js:47 ~ signin ~ req.body:", req.body);
  console.log("🚀 ~ file: authController.js:47 ~ signin ~ password:", password);
  console.log("🚀 ~ file: authController.js:47 ~ signin ~ username:", username);
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  const isValidPassword = bycript.compareSync(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      accessToken: null,
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400,
  });
  let authorities = [];
  try {
    const rolesOfuser = await user.getRoles();
    rolesOfuser.length > 0 &&
      rolesOfuser.forEach((role) => {
        authorities.push("ROLE_" + role.dataValues.name);
      });
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      image_url: user.image_url,
      accessToken: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e.message,
    });
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body;
  console.log(currentPassword, newPassword, userId);
  
  try {
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'Không tìm thấy người dùng.' });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bycript.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng.' });
    }

    // Mã hóa mật khẩu mới
    const salt = await bycript.genSalt(10);
    const hashedPassword = await bycript.hash(newPassword, salt);

    // Cập nhật mật khẩu mới trong cơ sở dữ liệu
    await User.update({ password: hashedPassword }, { where: { id: userId } });

    res.status(200).json({ message: 'ok' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
