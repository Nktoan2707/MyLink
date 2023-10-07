import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import { authAPI } from "../../services";
import * as actionUser from "./actions";
import userAPI from "../../services/userAPI";
export function* signInSaga() {
  yield takeLatest(types.SIGN_IN_SAGA, function* (action) {
    const { username, password } = action.payload;
    console.log("🚀 ~ file: saga.js:7 ~ yieldtakeLatest ~ password:", password);
    console.log("🚀 ~ file: saga.js:7 ~ yieldtakeLatest ~ username:", username);
    try {
      yield put(actionUser.setLoading(true));
      const res = yield call(authAPI.signin, username, password);
      const user = res.data;
      const { accessToken, id } = user;
      localStorage.setItem("userAccessToken", accessToken);
      localStorage.setItem("idUser", id);
      yield put(actionUser.setUserSuccess(user));
    } catch (e) {
      console.error(e);
      yield put(actionUser.setUserFail());
    }
  });
}

export function* logoutSaga() {
  yield takeLatest(types.LOG_OUT_SAGA, function* (action) {
    localStorage.removeItem("userAccessToken");
    yield put(actionUser.logout());
  });
}

export function* updateUserInfoSaga() {
  yield takeLatest(types.UPDATE_USER_INFO_SAGA, function* (action) {
    const { id, firstname, lastname, phone, city, dateofbirth, sex, address } = action.payload;
    console.log("🚀 ~ file: saga.js:35 ~ yieldtakeLatest ~ id:", id);
    try {
      yield put(actionUser.setLoading(true));
      const res = yield call(userAPI.updateUserInfo, id, {
        firstname,
        lastname,
        phone,
        city,
        dateofbirth,
        sex,
        address,
      });
      yield put(
        actionUser.setUserSuccess({
          firstName: firstname,
          lastName: lastname,
          phone,
          address,
          city,
          isMale: sex,
          dateOfBirth: dateofbirth,
        })
      );
    } catch (e) {
      console.error(e);
      yield put(actionUser.setUserFail());
    }
  });
}

export function* getUserSaga() {
  yield takeLatest(types.GET_USER, function* (action) {
    const id = action.payload;
    try {
      const res = yield call(userAPI.getUserById, id);
      const user = res.data;
      yield put(
        actionUser.setUserSuccess({
          firstName: user.firstname,
          lastName: user.lastname,
          address: user.address,
          dateOfBirth: user.dateofbirth,
          isMale: user.sex,
          phone: user.phone,
          city: user.city,
          email: user.email,
        })
      );
      console.log(user);
    } catch (e) {
      console.error(e);
      yield put(actionUser.setUserFail());
    }
  });
}
