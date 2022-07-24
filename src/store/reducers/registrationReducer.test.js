import { registerReducer } from "./registration";
import { changeControl } from "../actions/registration";
import { formError } from "../actions/registration";

let state = {
  isFormValid: false,
  formErrorMessage: "",
  formControls: {
    email: {
      value: "",
      errorMessage: "Введите корректный email",
      valid: false,
      touched: false,
    },
  },
};

let oldFormControls = {
  isFormValid: false,
  formErrorMessage: "",
  formControls: {
    email: {
      value: "",
      errorMessage: "Введите корректный email",
      valid: false,
      touched: false,
    },
  },
};

test("Should edit one of the form's controls", () => {
  let action = changeControl(oldFormControls, "test", "email");
  let newState = registerReducer(state, action);
  expect(newState.formControls.email.value).toBe("test");
  expect(newState.formControls.email.valid).toBe(false);
});

test("Should edit one of the form's controls", () => {
  let action = changeControl(oldFormControls, "test@mail.com", "email");
  let newState = registerReducer(state, action);
  expect(newState.formControls.email.value).toBe("test@mail.com");
  expect(newState.formControls.email.valid).toBe(true);
});

test("Should edit form error message", () => {
  let action = formError("New test error message");
  let newState = registerReducer(state, action);
  expect(newState.formErrorMessage).toBe("New test error message");
});

test("Should edit form error message", () => {
  let action = formError("");
  let newState = registerReducer(state, action);
  expect(newState.formErrorMessage).toBe("");
});
