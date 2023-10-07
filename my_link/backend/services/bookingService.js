import db from "../utils/db";
const { HistoryAddressBooking } = db;
export default {
  isCoordinatedBefore: async (address) => {
    const data = await HistoryAddressBooking.findOne({ where: { address } });
    return data;
  },
};
