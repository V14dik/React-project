import { combineReducers } from "redux";
import { registerReducer } from "./registration";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  register: registerReducer,
  user: userReducer,
});
