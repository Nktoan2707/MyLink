import db from "../utils/db";
import asyncHandler from "express-async-handler";
const { Op, Sequelize } = require("sequelize");

const { Driver, Booking, User } = db;

export const getTop10Drivers = asyncHandler(async (req, res) => {
  try {
    const topDrivers = await Driver.findAll({
      attributes: [
        "id",
        "full_name",
        "address",
        "phone_number",
        "car_license_number",
        "car_vehicle_registering",
        "banking_number",
        "insurance_info",
        "start_date",
        "company_tenture",
        "total_rating",
        "id_user",
        [
          db.sequelize.literal(
            "(SELECT SUM(total_money) FROM bookings WHERE bookings.id_driver = Driver.id)"
          ),
          "sum_cost",
        ],
      ],
      order: [[db.sequelize.literal("sum_cost DESC")]],
      limit: 10,
      include: [
        {
          model: Booking,
          attributes: [],
        },
        {
          model: User,
          attributes: ["image_url"],
          where: {
            id: db.sequelize.col('Driver.id_user'),
          },
          required: true, // Sử dụng required để đảm bảo rằng có một phù hợp trong bảng User.
        },
      ],
    });

    res.status(200).json({
      message: "ok",
      data: topDrivers,
    });
  } catch (error) {
    console.error("Lỗi trong quá trình truy vấn:", error);
    res.status(500).json({ message: error.message });
  }
});


export const getStatisticsFromDateToDate = asyncHandler(async (req, res) => {
  const { fromDate, toDate } = req.body;

  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);

  try {
    const statisticsPromises = [];
    const formattedData = new Set();

    while (startDate <= endDate) {
      const currentDate = new Date(startDate);
      const nextDate = new Date(startDate);
      nextDate.setDate(currentDate.getDate() + 1);

      const statisticsPromise = Booking.findAll({
        attributes: [
          "id_city",
          [db.sequelize.fn("DATE", db.sequelize.col("createdAt")), "date"],
          [
            db.sequelize.fn("COUNT", db.sequelize.col("id_customer")),
            "customer_count",
          ],
          [
            db.sequelize.fn("SUM", db.sequelize.col("total_money")),
            "total_revenue",
          ],
        ],
        where: {
          createdAt: {
            [Op.between]: [currentDate, nextDate],
          },
        },
        group: [
          "id_city",
          db.sequelize.fn("DATE", db.sequelize.col("createdAt")),
        ],
      });

      statisticsPromises.push(statisticsPromise);

      startDate.setDate(startDate.getDate() + 1);
    }

    const statisticsData = await Promise.all(statisticsPromises);

    // Chuyển đổi kết quả thành dạng mong muốn và loại bỏ trùng lặp
    statisticsData.forEach((item) => {
      const data = item.map((record) => {
        return {
          city: record.getDataValue("id_city"),
          date: record.getDataValue("date"),
          total_customer: record.getDataValue("customer_count"),
          total_revenue: record.getDataValue("total_revenue"),
        };
      });
      data.forEach((entry) => formattedData.add(JSON.stringify(entry)));
    });

    // Chuyển Set thành mảng
    const uniqueFormattedData = [...formattedData].map((entry) =>
      JSON.parse(entry)
    );

    const cities = [];
    uniqueFormattedData.forEach((item) => {
      const city = item.city;

      if (!cities.includes(city)) {
        cities.push(city);
      }
    });

    const dates = generateDateRange(fromDate, toDate);

    const responseData = [];
    cities.forEach((city) => {
      const objNumberCustomer = {};
      const objRevenue = {};

      uniqueFormattedData.forEach((item) => {
        if (item.city === city) {
          objNumberCustomer.city = city;
          objNumberCustomer.type = "SL Khách hàng";

          objRevenue.city = city;
          objRevenue.type = "Doanh thu";

          dates.forEach((date) => {
            objNumberCustomer[date] =
              item.date === date ? item.total_customer : 0;
            objRevenue[date] = item.date === date ? item.total_revenue : 0;
          });
        }
      });

      responseData.push(objNumberCustomer);
      responseData.push(objRevenue);
    });

    res.status(200).json({ message: 'ok', data: responseData });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export const getRevenueToday = asyncHandler(async (req, res) => {
  const today = getCurrentDate();

  try {
    let data = await Booking.sum("total_money", {
      where: db.sequelize.where(
        db.sequelize.fn("DATE", db.sequelize.col("createdAt")),
        today
      ),
    });

    data = data? data: 0;

    res.status(200).json({ message: 'ok', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const totalRevenuesEachMonth = asyncHandler(async (req, res) => {
  try {
    const results = {};

    const year = 2023; // Chọn năm bạn muốn lấy dữ liệu
    const months = Array.from({ length: 12 }, (_, i) => i + 1); // Tạo mảng [1, 2, ..., 12] đại diện cho các tháng

    // Lặp qua từng tháng
    for (const month of months) {
      const startDate = new Date(year, month - 1, 1); // Ngày đầu tháng
      const endDate = new Date(year, month, 0); // Ngày cuối tháng

      const totalRevenues = await Booking.sum("total_money", {
        where: {
          createdAt: {
            [Sequelize.Op.between]: [startDate, endDate],
          },
        },
      });

      results[month] = totalRevenues ? totalRevenues : 0;
    }

    res.status(200).json({ message: 'ok', results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const totalRevenuesEachCities = asyncHandler(async (req, res) => {
  try {
    const results = await Booking.findAll({
      attributes: [
        "id_city",
        [Sequelize.fn("SUM", Sequelize.col("total_money")), "total_money"],
      ],
      group: ["id_city"],
    });

    const labels = results.map((item) => {
      return item.id_city;
    });

    const data = results.map((item) => {
      return item.total_money;
    });

    res.status(200).json({ message: 'ok', labels, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function generateDateRange(fromDate, toDate) {
  const dateRange = [];
  const currentDate = new Date(fromDate);
  const endDate = new Date(toDate);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Thêm 0 đằng trước nếu tháng < 10
    const day = String(currentDate.getDate()).padStart(2, "0"); // Thêm 0 đằng trước nếu ngày < 10
    const formattedDate = `${year}-${month}-${day}`;
    dateRange.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Lưu ý rằng tháng bắt đầu từ 0
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
