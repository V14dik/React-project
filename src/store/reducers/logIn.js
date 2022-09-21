import {
  CHANGE_LOG_IN_FORM_CONTROL,
  CHANGE_LOG_IN_FORM_ERROR,
  CLEAN_INPUTS,
} from "../actions/actionTypes";

const initialState = {
  isFormValid: false,
  formErrorMessage: "",
  formControls: {
    email: {
      value: "",
      errorMessage: "Введите корректный email",
      valid: false,
      touched: false,
    },
    password: {
      value: "",
      errorMessage: "Введите корректный пароль",
      valid: false,
      touched: false,
    },
  },
};

export function logInReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOG_IN_FORM_CONTROL:
      return {
        ...state,
        isFormValid: action.payload.isFormValid,
        formControls: {
          ...state.formControls,
          [action.payload.changedInputName]: action.payload.changedInput,
        },
      };
    case CHANGE_LOG_IN_FORM_ERROR:
      return {
        ...state,
        formErrorMessage: action.payload.errorMessage,
      };
    case CLEAN_INPUTS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
