import * as types from "./types";
const INIT_STATE = {
  isFinding: false,
  id: undefined,
  idDriver: undefined,
  tripFare: 0,
  distance: 0,
  isError: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case types.ADD_BOOKING_SUCCESS:
      return {
        ...state,
        isFinding: false,
        ...action.payload,
      };
    case types.ADD_BOOKING_FAIL:
      return {
        ...state,
        isError: true,
        isFinding: false,
      };
    case types.SET_LOADING:
      return {
        ...state,
        isFinding: action.payload,
      };
    default:
      return state;
  }
};
