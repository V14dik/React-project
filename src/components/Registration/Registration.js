import React, { Component, useReducer } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import axios from "axios";
import {
  changeControl,
  registerAccount,
} from "../../store/actions/registration";
import { initialState } from "../../store/reducers/registration";
import { registerReducer } from "../../store/reducers/registration";

function RegistrationForm() {
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const formControls = state.formControls;
  const isFormValid = state.isFormValid;

  const onChangeHandler = (event, controlName) => {
    dispatch(changeControl(formControls, event.target.value, controlName));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Регистрация</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(registerAccount(formControls));
          }}
        >
          <Input
            control={formControls.email}
            onChange={(event) => onChangeHandler(event, "email")}
          />
          <Input
            control={formControls.password}
            onChange={(event) => onChangeHandler(event, "password")}
          />
          <Input
            control={formControls.repeatPassword}
            onChange={(event) => onChangeHandler(event, "repeatPassword")}
          />
          <Button disabled={!isFormValid} type="primary">
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
