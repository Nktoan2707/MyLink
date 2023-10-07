import * as types from "./types";

const INIT_STATE = {
  userId: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  dateOfBirth: "",
  isMale: true,
  isLoading: false,
  isError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.SET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case types.SET_USER_FAIL:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.LOG_OUT:
      return {
        ...INIT_STATE,
      };
    default:
      return state;
  }
};
