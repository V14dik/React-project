import {
  REGISTER_ACCOUNT_SUCCESS,
  DELETE_USER,
  CHANGE_USER,
  GET_USERS,
} from "../actions/actionTypes";

const initialState = {
  userToken: "",
  users: [],
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
    case CHANGE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.key]: action.payload.user,
        },
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
}
