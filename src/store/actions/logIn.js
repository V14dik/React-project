import axios from "axios";
import { toast } from "react-toastify";
import {
  CHANGE_LOG_IN_FORM_ERROR,
  CHANGE_LOG_IN_FORM_CONTROL,
} from "./actionTypes";
import { registerAccountSuccess } from "./user";
import { startUrl } from "../../utils/url";

export const logIn = (formControls) => {
  const controls = ["email", "password"];
  return async (dispatch) => {
    try {
      const logInData = {
        email: formControls.email.value,
        password: formControls.password.value,
      };
      let url = startUrl + "api/v1/auth/jwt/create/";
      const response = await axios.post(url, logInData);
      const data = response.data;
      const token = data.access;
      localStorage.setItem("token", token);
      dispatch(registerAccountSuccess(token));
    } catch (error) {
      const errorControlName = Object.keys(error.response.data)[0];
      if (error.response.status === 400) {
        const control = { ...formControls[errorControlName] };
        control.valid = false;
        if (controls.includes(errorControlName)) {
          const errorMessage = error.response.data[errorControlName][0];
          control.errorMessage = errorMessage;
          dispatch(logInError(errorControlName, control));
        } else {
          const errorMessage = error.response.data[errorControlName];
          dispatch(logInFormError(errorMessage));
        }
      } else {
        toast.error(error.response.data[errorControlName], {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
      }
    }
  };
};

export function logInFormError(formErrorMessage) {
  return {
    type: CHANGE_LOG_IN_FORM_ERROR,
    payload: {
      errorMessage: formErrorMessage,
    },
  };
}

export function logInError(controlName, control) {
  return {
    type: CHANGE_LOG_IN_FORM_CONTROL,
    payload: {
      isFormvalid: false,
      changedInputName: controlName,
      changedInput: { ...control },
    },
  };
}
