import { validateEmail } from "./validateEmail";

export const validateControl = (value, validation, passwordValue) => {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (validation.email) {
    isValid = validateEmail(value) && isValid;
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }
  if (validation.isRepeatPassword) {
    isValid = value === passwordValue;
  }

  return isValid;
};
