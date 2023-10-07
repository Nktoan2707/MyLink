import db from "../utils/db";
import asyncHandler from "express-async-handler";
const { Op, Sequelize } = require("sequelize");

const { User, Admin, Employee, Driver, Customer } = db;

export const getListUser = asyncHandler(async (req, res) => {
  const users = [
    {
      name: "Nguyen Huu Khai",
      username: "nguyenkhai",
    },
    {
      name: "Nguyen Khanh Toan",
      username: "nguyentoan",
    },
    {
      name: "Nguyen Huu Loc",
      username: "nguyenloc",
    },
    {
      name: "Nguyen Van Phu",
      username: "nguyenphu",
    },
  ];
  // controller sẽ gọi service
  // service sẽ gọi xuống db
  res.status(200).json(users);
});

export const getTotalUserToday = asyncHandler(async (req, res) => {
  const currentDate = getCurrentDate();
  try {
    //Cách 1
    const data = await User.count({
      where: db.sequelize.where(db.sequelize.fn("DATE", db.sequelize.col("createdAt")), currentDate),
    });

    res.status(200).json({ message: "ok", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  try {
    // Lấy thông tin cá nhân từ yêu cầu
    const { full_name, address, phone_number, email, role, userId } = req.body;
    const userIdRole = req.params.userIdRole;

    console.log(full_name, address, phone_number, email, role);

    let userRole = null;
    if (role === "admin") {
      userRole = Admin;
    } else if (role === "driver") {
      userRole = Driver;
    } else if (role === "customer") {
      userRole = Customer;
    } else if (role === "employee") {
      userRole = Employee;
    }

    // Lấy URL của ảnh từ Cloudinary (nếu ảnh đã được tải lên)
    const imageUrl = req.file ? req.file.path : null;

    await userRole.update(
      { full_name, address, phone_number },
      { where: { id_user: userId } }
    );

    if(imageUrl) {
      console.log(imageUrl);
      const result = await User.update(
        { email, image_url: imageUrl },
        { where: { id: userId } }
      );
    } else {
      await User.update(
        { email },
        { where: { id: userId } }
      );
    }

    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getUserByIdForRole = asyncHandler(async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const { role } = req.body;
    console.log(idUser, role);

    let userRole = null;
    if (role === "admin") {
      userRole = Admin;
    } else if (role === "driver") {
      userRole = Driver;
    } else if (role === "customer") {
      userRole = Customer;
    } else if (role === "employee") {
      userRole = Employee;
    }

    const user = await userRole.findOne({
      include: {
        model: User,
        where: {
          id: idUser,
        },
      },
      where: {
        "$User.id$": { [Op.eq]: Sequelize.col("Admin.id_user") },
      },
    });

    return res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const enableOrDisable = asyncHandler(async (req, res) => {
  const { idUser, isEnabled } = req.body;
  console.log(idUser, isEnabled);

  try {
    await User.update(
      { status_account: isEnabled },
      { where: { id: idUser } }
    );
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Lưu ý rằng tháng bắt đầu từ 0
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const updateUserInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ file: userController.js:29 ~ updateUserInfo ~ id:", id);
  const { firstname, lastname, phone, city, dateofbirth, sex, address } = req.body;
  try {
    const user = await db.User.update(
      { firstname, lastname, phone, city, dateofbirth, sex, address },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ message: "Update successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Update failed" });
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findByPk(id);
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = {
  getListUser,
  updateUserInfo,
  getUserById,
  getTotalUserToday,
  updateUser,
};
