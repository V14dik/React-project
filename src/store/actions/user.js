import axios from "axios";
import {
  CHANGE_REGISTER_FORM_CONTROL,
  DELETE_USER,
  REGISTER_ACCOUNT_SUCCESS,
  GET_USERS,
  REFRESH_TOKEN,
  LOG_OUT,
} from "./actionTypes";
import { registrationFormError } from "./registration";
import { toast } from "react-toastify";
import { startUrl } from "../../utils/url";

export function registerAccount(formControls) {
  const controls = ["email", "password", "re_password"];
  return async (dispatch) => {
    try {
      const regData = {
        email: formControls.email.value,
        password: formControls.password.value,
        re_password: formControls.repeatPassword.value,
      };
      let url = startUrl + "api/v1/auth/jwt/register/";
      const response = await axios.post(url, regData);
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", accessToken);
      dispatch(registerAccountSuccess(accessToken, refreshToken));
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

export function registerAccountSuccess(accessToken, refreshToken) {
  return {
    type: REGISTER_ACCOUNT_SUCCESS,
    accessToken: accessToken,
    refreshToken: refreshToken,
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

export function logOut() {
  return {
    type: LOG_OUT,
  };
}

export const getUsers = () => {
  return async (dispatch) => {
    try {
      let url = startUrl + "api/v1/users/";
      const response = await axios.get(url);
      const users = response.data;
      dispatch(setUsers(users));
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    }
  };
};

export function setUsers(users) {
  return {
    type: GET_USERS,
    payload: {
      users: users,
    },
  };
}

export function deleteUser(users, key) {
  delete users[key];
  return {
    type: DELETE_USER,
    payload: {
      users: users,
    },
  };
}

export const changeUser = (user) => {
  return async (dispatch) => {
    try {
      const data = {
        id: user.id,
        email: user.email,
      };
      const url = startUrl + `api/v1/users/${user.id}/`;
      await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      dispatch(getUsers());
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(refreshToken(localStorage.getItem("refreshToken")));
        dispatch(changeUser(user));
        return;
      }
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    }
  };
};

export const refreshToken = (refreshToken) => {
  return async (dispatch) => {
    try {
      const data = {
        refresh: refreshToken,
      };
      const url = startUrl + "api/v1/auth/jwt/refresh/";
      const response = await axios.post(url, data);
      const accessToken = response.data.access;
      console.log("newToken: ", accessToken);
      dispatch(refreshTokenSuccess(accessToken));
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    }
  };
};

export const refreshTokenSuccess = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
  return {
    type: REFRESH_TOKEN,
    payload: {
      accessToken,
    },
  };
};
