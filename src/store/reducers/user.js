import { REGISTER_ACCOUNT_SUCCESS } from "../actions/actionTypes";

const initialState = {
  userToken: "",
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_ACCOUNT_SUCCESS:
      return {
        ...state,
        userToken: action.token,
      };
    default:
      return state;
  }
}
