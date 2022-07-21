import { combineReducers } from "redux";
import { registerReducer } from "./registration";

export default combineReducers({
  register: registerReducer,
});
