import * as types from "./types";

export const signinSaga = (payload) => ({ type: types.SIGN_IN_SAGA, payload });
export const setUserSuccess = (payload) => ({ type: types.SET_USER_SUCCESS, payload });
export const setUserFail = (payload) => ({ type: types.SET_USER_FAIL, payload });
export const updateUserInfoSaga = (payload) => ({ type: types.UPDATE_USER_INFO_SAGA, payload });
export const getUser = (payload) => ({ type: types.GET_USER, payload });
export const setLoading = (payload) => ({ type: types.SET_LOADING, payload });
export const logoutSaga = () => ({ type: types.LOG_OUT_SAGA });
export const logout = () => ({ type: types.LOG_OUT });
