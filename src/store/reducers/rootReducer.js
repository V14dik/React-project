import { combineReducers } from "redux";
import { registerReducer } from "./registration";
import { userReducer } from "./user";
import { logInReducer } from "./logIn";

export const rootReducer = combineReducers({
  register: registerReducer,
  logIn: logInReducer,
  user: userReducer,
});
