import { CHANGE_FORM_CONTROL, CHANGE_FORM_ERROR_MESSAGE } from "./actionTypes";
import { changeControl, formError } from "./registration";

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
    type: CHANGE_FORM_CONTROL,
    payload: payload,
  });
});

test("Should return action whith new form error", () => {
  expect(formError("Test form error")).toEqual({
    type: CHANGE_FORM_ERROR_MESSAGE,
    payload: {
      errorMessage: "Test form error",
    },
  });
});
