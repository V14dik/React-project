import axios from "axios";
import {
  CHANGE_REGISTER_FORM_CONTROL,
  REGISTER_ACCOUNT_SUCCESS,
} from "./actionTypes";
import { registrationFormError } from "./registration";
import { toast } from "react-toastify";

export function registerAccount(formControls) {
  const controls = ["email", "password", "re_password"];
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
      toast.success("Вы зарегистрированы!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    } catch (error) {
      const errorControlName = Object.keys(error.response.data)[0];
      if (error.response.status === 400) {
        const control = { ...formControls[errorControlName] };
        control.valid = false;
        if (controls.includes(errorControlName)) {
          const errorMessage = error.response.data[errorControlName][0];
          control.errorMessage = errorMessage;
          dispatch(registerAccountError(errorControlName, control));
        } else {
          const errorMessage = error.response.data[errorControlName];
          dispatch(registrationFormError(errorMessage));
        }
      } else {
        toast.error(error.response.data[errorControlName], {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
      }
    }
  };
}

export function registerAccountSuccess(token) {
  return {
    type: REGISTER_ACCOUNT_SUCCESS,
    token: token,
  };
}

export function registerAccountError(controlName, control) {
  return {
    type: CHANGE_REGISTER_FORM_CONTROL,
    payload: {
      isFormvalid: false,
      changedInputName: controlName,
      changedInput: { ...control },
    },
  };
}
