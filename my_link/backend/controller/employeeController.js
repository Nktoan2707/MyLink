import db from "../utils/db";
import asyncHandler from "express-async-handler";
const { Op, Sequelize } = require("sequelize");

const { User, Employee } = db;

export const getListEmployees = asyncHandler(async (req, res) => {
  //   try {
  //     const listUserRoles = await UserRoles.findAll({
  //       attributes: ["userId", "roleId"],
  //     });
  //     const data = listUserRoles.map((userRole) => {
  //       return userRole.dataValues;
  //     });

  //     res.status(200).json({
  //       msg: "ok",
  //       data: data,
  //     });
  //   } catch (err) {
  //     res.status(500).json({
  //       message: e.message,
  //     });
  //   }
  try {
    const listEmployees = await Employee.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: {
        "$User.id$": { [Op.eq]: Sequelize.col("Employee.id_user") },
      },
    });

    return res.status(200).json({
      message: "ok",
      data: listEmployees,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const {
      id,
      fullName,
      address,
      phoneNumber,
      email,
      username
    } = req.body;
    let result = null;
    result = await Employee.update(
      {
        full_name: fullName,
        address: address,
        phone_number: phoneNumber,
        email,
        username
      },
      {
        where: {id: id},
      }
    );

    if (result) {
      res.status(200).json({ message: "ok" });
    } else {
      res.status(400).json({ message: "Có lỗi xảy ra" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const deleteEmployee = asyncHandler(async (req, res) => {
    await db.sequelize.sync();
    const transaction = await db.sequelize.transaction();

    try {
        const id = req.params.id;
        const userId = req.params.userId;

        await Employee.destroy({ where: { id: id }, transaction });
        await User.destroy({ where: { id: userId }, transaction });

        await transaction.commit();

        res.status(200).json({ message: "ok" });
    } catch(err) {
        await transaction.roolback();
        res.status(500).json({ message: err.message });
    }
})

export const totalEmployees = asyncHandler(async (req, res) => {
  try {
    const data = await Employee.findAll({
      attributes: [
        [db.sequelize.fn("COUNT", db.sequelize.col("id")), "total_employees"],
      ],
    });

    res.status(200).json({ message: 'ok', data: data[0] })
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});
