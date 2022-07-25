import { CHANGE_FORM_CONTROL, REGISTER_ACCOUNT_SUCCESS } from "./actionTypes";
import { registerAccountSuccess, registerAccountError } from "./user";

test("Should return action with user token", () => {
  expect(registerAccountSuccess("testToken123")).toEqual({
    type: REGISTER_ACCOUNT_SUCCESS,
    token: "testToken123",
  });
});

test("Should return action whith changed input", () => {
  const control = {
    value: "",
    errorMessage: "Введите корректный email",
    valid: false,
    touched: false,
  };
  expect(registerAccountError("email", control)).toEqual({
    type: CHANGE_FORM_CONTROL,
    payload: {
      isFormvalid: false,
      changedInputName: "email",
      changedInput: { ...control },
    },
  });
});
