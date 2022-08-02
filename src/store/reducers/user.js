import { REGISTER_ACCOUNT_SUCCESS, DELETE_USER } from "../actions/actionTypes";

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
    case DELETE_USER:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
}
