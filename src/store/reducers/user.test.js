import { userReducer } from "./user";
import { REGISTER_ACCOUNT_SUCCESS } from "../actions/actionTypes";

test("Should set user token", () => {
  const state = {
    userToken: "",
  };
  let action = {
    type: REGISTER_ACCOUNT_SUCCESS,
    token: "testToken12345678",
  };
  let newState = userReducer(state, action);
  expect(newState.userToken).toBe("testToken12345678");
});
