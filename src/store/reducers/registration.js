import {
  INCREMENT,
  CHANGE_FORM_CONTROL,
  REGISTER_ACCOUNT,
} from "../actions/actionTypes";

export function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + action.payload };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

export const initialState = {
  userToken: null,
  isFormValid: false,
  formControls: {
    email: {
      value: "",
      type: "email",
      label: "Email",
      defaultErrorMessage: "Введите корректный email",
      errorMessage: "Введите корректный email",
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: "",
      type: "password",
      label: "Password",
      defaultErrorMessage: "Введите корректный пароль",
      errorMessage: "Введите корректный пароль",
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 8,
      },
    },
    repeatPassword: {
      value: "",
      type: "password",
      label: "Repeat Password",
      defaultErrorMessage: "Пароли должны совпадать",
      errorMessage: "Пароли должны совпадать",
      valid: false,
      touched: false,
      validation: {
        required: true,
        isRepeatPassword: true,
      },
    },
  },
};

export function registerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM_CONTROL:
      return {
        ...state,
        isFormValid: action.isFormValid,
        formControls: action.formControls,
      };
    case REGISTER_ACCOUNT:
      return {
        ...state,
        userToken: action.token,
      };
    default:
      return state;
  }
}
