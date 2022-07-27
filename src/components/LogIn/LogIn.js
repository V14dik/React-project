import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeControl, formError } from "../../store/actions/registration";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

export function LogIn() {
  const dispatch = useDispatch();
  const { formControls, isFormValid, formErrorMessage } = useSelector(
    ({ register }) => register
  );

  const onChangeHandler = (event, controlName) => {
    dispatch(changeControl(formControls, event.target.value, controlName));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Вход</h1>
        {formErrorMessage ? (
          <div className="alert alert-danger">{formErrorMessage}</div>
        ) : null}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(formError(""));
          }}
        >
          <Input
            control={formControls.email}
            type={"email"}
            label={"Email"}
            onChange={(event) => onChangeHandler(event, "email")}
          />
          <Input
            control={formControls.password}
            type={"password"}
            label={"Password"}
            onChange={(event) => onChangeHandler(event, "password")}
          />
          <Button type="primary">Зарегистрироваться</Button>
        </form>
      </div>
    </div>
  );
}
