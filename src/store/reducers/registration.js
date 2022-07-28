import {
  CHANGE_REGISTER_FORM_CONTROL,
  CHANGE_REGISTRATION_FORM_ERROR_MESSAGE,
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
    repeatPassword: {
      value: "",
      errorMessage: "Пароли должны совпадать",
      valid: false,
      touched: false,
    },
  },
};

export function registerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_REGISTER_FORM_CONTROL:
      return {
        ...state,
        isFormValid: action.payload.isFormValid,
        formControls: {
          ...state.formControls,
          [action.payload.changedInputName]: action.payload.changedInput,
        },
      };
    case CHANGE_REGISTRATION_FORM_ERROR_MESSAGE:
      return {
        ...state,
        formErrorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
