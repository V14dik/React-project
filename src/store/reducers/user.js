import {
  REGISTER_ACCOUNT_SUCCESS,
  DELETE_USER,
  CHANGE_USER,
  GET_USERS,
  REFRESH_TOKEN,
} from "../actions/actionTypes";

const initialState = {
  accessToken: "",
  refreshToken: "",
  users: [],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_ACCOUNT_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
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
    case REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
}
