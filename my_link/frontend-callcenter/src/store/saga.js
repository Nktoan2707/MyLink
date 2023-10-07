import { all, fork } from "redux-saga/effects";
import { sagas } from "../redux";
export default function* rootSaga() {
  console.log("🚀 ~ file: saga.js:5 ~ function*rootSaga ~ sagas:", sagas);
  yield all([...Object.values(sagas)].map(fork));
}
