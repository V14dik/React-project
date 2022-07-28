import { registerReducer } from "./registration";
import {
  CHANGE_REGISTER_FORM_CONTROL,
  CHANGE_FORM_ERROR_MESSAGE,
} from "../actions/actionTypes";

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

test("Should edit one of the form's controls", () => {
  const action = {
    type: CHANGE_REGISTER_FORM_CONTROL,
    payload: {
      isFormValid: "test",
      changedInputName: "test",
    },
  };
  expect(registerReducer(state, action)).toEqual({
    ...state,
    isFormValid: action.payload.isFormValid,
    formControls: {
      ...state.formControls,
      [action.payload.changedInputName]: action.payload.changedInput,
    },
  });
});

test("Should edit form error message", () => {
  let action = {
    type: CHANGE_FORM_ERROR_MESSAGE,
    payload: {
      errorMessage: "test error message",
    },
  };
  expect(registerReducer(state, action)).toEqual({
    ...state,
    formErrorMessage: action.payload.errorMessage,
  });
});
