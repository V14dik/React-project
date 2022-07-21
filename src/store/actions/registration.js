import {
  INCREMENT,
  CHANGE_FORM_CONTROL,
  REGISTER_ACCOUNT,
} from "./actionTypes";
import axios from "axios";
import { validateControl } from "../../utils/validateControl";

export const increment = (amount) => {
  console.log(amount);
  return {
    type: INCREMENT,
    payload: amount,
  };
};

export const changeControl = (formControls, newValue, controlName) => {
  const controls = { ...formControls };
  const control = { ...controls[controlName] };

  if (control.errorMessage !== control.defaultErrorMessage) {
    control.errorMessage = control.defaultErrorMessage;
  }

  control.value = newValue;
  control.touched = true;
  control.valid = validateControl(
    control.value,
    control.validation,
    controls["password"].value
  );

  controls[controlName] = control;

  let isFormValid = true;

  Object.keys(controls).forEach((name) => {
    isFormValid = controls[name].valid && isFormValid;
  });
  return {
    type: CHANGE_FORM_CONTROL,
    isFormValid: isFormValid,
    formControls: { ...controls },
  };
};

export async function registerAccount(formControls) {
  try {
    const regData = {
      email: formControls.email.value,
      password: formControls.password.value,
      re_password: formControls.repeatPassword.value,
    };
    let url = "http://localhost:8000/api/v1/auth/jwt/register/";
    const response = await axios.post(url, regData);
    const data = response.data;
    const token = data.access;
    localStorage.setItem("token", token);
    console.log(token);
    return {
      type: REGISTER_ACCOUNT,
      token: token,
    };
  } catch (error) {
    alert(
      "Пароль должен содержать хотя бы одну прописную и одну строчную букву, а также цифру и спецсимвол."
    );
  }
}
