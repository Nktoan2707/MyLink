import amqplib from "amqplib";

export const apiConvertAddressToCoor = (address) =>
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

export const changeAddressToLongtitudeAndLatitude = async (address) => {
  const apiUrl = apiConvertAddressToCoor(address);
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length > 0) {
      const location = data[0];
      return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return null;
  }
};
export const connectToRabbitMQ = async () => {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqplib.connect(amqpServer);
    if (connection) console.log("Connect to RabbitMQ Server successfully");
    const chanel = await connection.createChannel();
    // await chanel.assertQueue("coordinating_car_booking");
    return chanel;
  } catch (e) {
    console.error(e);
  }
};
