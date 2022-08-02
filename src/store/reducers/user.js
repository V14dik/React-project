import { REGISTER_ACCOUNT_SUCCESS } from "../actions/actionTypes";

const users = require("../../components/Users/users.json");
const initialState = {
  userToken: "",
  users: users,
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
