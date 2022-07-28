import {
  CHANGE_REGISTER_FORM_CONTROL,
  CHANGE_REGISTRATION_FORM_ERROR_MESSAGE,
  CHANGE_LOG_IN_FORM_CONTROL,
} from "./actionTypes";
import {
  validateRequeired,
  validateMinLength,
  validateEmail,
  isRepeatPassword,
} from "../../utils/validations";

export const changeControl = (formControls, newValue, controlName) => {
  const controls = { ...formControls };
  const control = { ...controls[controlName] };

  control.value = newValue;
  control.touched = true;
  switch (controlName) {
    case "email":
      control.valid =
        validateRequeired(control.value) && validateEmail(control.value);
      if (!control.valid) {
        control.errorMessage = "Введите корректный email";
      }
      break;
    case "password":
      control.valid =
        validateRequeired(control.value) && validateMinLength(control.value, 8);
      if (!control.valid) {
        control.errorMessage = "Введите корректный пароль";
      }
      break;
    case "repeatPassword":
      control.valid =
        validateRequeired(control.value) &&
        isRepeatPassword(controls.password.value, control.value);
      if (!control.valid) {
        control.errorMessage = "Пароли должны совпадать";
      }
      break;
    default:
      break;
  }

  controls[controlName] = control;

  let isFormValid = true;
  Object.keys(controls).forEach((name) => {
    isFormValid = controls[name].valid && isFormValid;
  });
  const payload = {
    isFormValid: isFormValid,
    changedInputName: controlName,
    changedInput: { ...control },
  };
  if (Object.keys(controls).length === 2) {
    return {
      type: CHANGE_LOG_IN_FORM_CONTROL,
      payload: payload,
    };
  }
  return {
    type: CHANGE_REGISTER_FORM_CONTROL,
    payload: payload,
  };
};

export function registrationFormError(formErrorMessage) {
  return {
    type: CHANGE_REGISTRATION_FORM_ERROR_MESSAGE,
    payload: {
      errorMessage: formErrorMessage,
    },
  };
}
