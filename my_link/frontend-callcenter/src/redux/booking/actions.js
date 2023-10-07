import * as types from "./types";
export const addBookingSaga = (payload) => ({ type: types.ADD_BOOKING_SAGA, payload });
export const addBookingSuccess = (payload) => ({ type: types.ADD_BOOKING_SUCCESS, payload });
export const addBookingFail = () => ({ type: types.ADD_BOOKING_FAIL });
export const setLoading = (payload) => ({ type: types.SET_LOADING, payload });
