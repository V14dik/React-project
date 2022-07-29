import {
  CHANGE_REGISTER_FORM_CONTROL,
  CHANGE_REGISTRATION_FORM_ERROR_MESSAGE,
} from "./actionTypes";
import { changeControl, registrationFormError } from "./registration";

test("Should return action", () => {
  const formControls = {
    email: {
      value: "",
      errorMessage: "Введите корректный email",
      valid: false,
      touched: false,
    },
  };
  const payload = {
    isFormValid: false,
    changedInputName: "email",
    changedInput: {
      ...formControls.email,
      value: "testvalue",
      touched: true,
    },
  };
  expect(changeControl(formControls, "testvalue", "email")).toEqual({
    type: CHANGE_REGISTER_FORM_CONTROL,
    payload: payload,
  });
});

test("Should return action whith new form error", () => {
  expect(registrationFormError("Test form error")).toEqual({
    type: CHANGE_REGISTRATION_FORM_ERROR_MESSAGE,
    payload: {
      errorMessage: "Test form error",
    },
  });
});
