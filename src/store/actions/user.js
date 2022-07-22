import axios from "axios";
import { REGISTER_ACCOUNT_SUCCESS } from "./actionTypes";

export function registerAccount(formControls) {
  return async (dispatch) => {
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
      dispatch(registerAccountSuccess(token));
    } catch (error) {
      console.log(Object.keys(error.response.data)[0]);
      //alert(error.response.data[0]);
      //alert(
      //   "Пароль должен содержать хотя бы одну прописную и одну строчную букву, а также цифру и спецсимвол."
      // );
    }
  };
}

export function registerAccountSuccess(token) {
  return {
    type: REGISTER_ACCOUNT_SUCCESS,
    token: token,
  };
}
