import db from "../utils/db";
import asyncHandler from "express-async-handler";
const { Op, Sequelize } = require("sequelize");

const { User, Driver } = db;

export const getListDrivers = asyncHandler(async (req, res) => {
  try {
    const listDrivers = await Driver.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: {
        "$User.id$": { [Op.eq]: Sequelize.col("Driver.id_user") },
      },
    });

    return res.status(200).json({
      message: "ok",
      data: listDrivers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const updateDriver = asyncHandler(async (req, res) => {
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
    result = await Driver.update(
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

export const deleteDriver = asyncHandler(async (req, res) => {
    await db.sequelize.sync();
    const transaction = await db.sequelize.transaction();

    try {
        const id = req.params.id;
        const userId = req.params.userId;

        await Driver.destroy({ where: { id: id }, transaction });
        await User.destroy({ where: { id: userId }, transaction });

        await transaction.commit();

        res.status(200).json({ message: "ok" });
    } catch(err) {
        await transaction.roolback();
        res.status(500).json({ message: err.message });
    }
})

export const totalDrivers = asyncHandler(async (req, res) => {
  try {
    const data = await Driver.findAll({
      attributes: [
        [db.sequelize.fn("COUNT", db.sequelize.col("id")), "total_drivers"],
      ],
    });

    res.status(200).json({ message: 'ok', data: data[0] })
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

export const totalDriversEachMonth = asyncHandler(async (req, res) => {
  try {
    const results = {};
  
    const year = 2023; // Chọn năm bạn muốn lấy dữ liệu
    const months = Array.from({ length: 12 }, (_, i) => i + 1); // Tạo mảng [1, 2, ..., 12] đại diện cho các tháng
  
    // Lặp qua từng tháng
    for (const month of months) {
      const startDate = new Date(year, month - 1, 1); // Ngày đầu tháng
      const endDate = new Date(year, month, 0); // Ngày cuối tháng
  
      const totalDrivers = await Driver.count({
        where: {
          createdAt: {
            [Sequelize.Op.between]: [startDate, endDate],
          },
        },
      });
  
      results[month] = totalDrivers;
    }
  
    res.status(200).json({ message: 'ok', results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
});