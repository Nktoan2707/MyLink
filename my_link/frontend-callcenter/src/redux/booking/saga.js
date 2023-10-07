import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import { bookingAPI } from "../../services";
import * as bookingAction from "./actions";
export function* addBookingSaga() {
  yield takeLatest(types.ADD_BOOKING_SAGA, function* (action) {
    const { customer, address, phone, destination } = action.payload;
    try {
      yield put(bookingAction.setLoading(true));
      const res = yield call(bookingAPI.bookingCar, { customer, address, phone, destination });
      console.log("🚀 ~ file: saga.js:11 ~ yieldtakeLatest ~ res:", res);
      const data = res.data;
      console.log("🚀 ~ file: saga.js:12 ~ yieldtakeLatest ~ data:", data);
      yield put(bookingAction.addBookingSuccess(data));
    } catch (e) {
      console.error(e);
      yield put(bookingAction.addBookingFail());
    }
  });
}
