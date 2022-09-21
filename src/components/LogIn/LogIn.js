import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../store/actions/logIn";
import { changeControl, cleanInputs } from "../../store/actions/registration";
import { logInFormError } from "../../store/actions/logIn";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Toast } from "../UI/Toast/Toast";
import { useNavigate } from "react-router-dom";

export function LogIn() {
  const dispatch = useDispatch();
  const { formControls, isFormValid, formErrorMessage } = useSelector(
    ({ logIn }) => logIn
  );
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(cleanInputs());
    };
  }, []);

  const onChangeHandler = (event, controlName) => {
    dispatch(changeControl(formControls, event.target.value, controlName));
  };

  return (
    <div className="container">
      <div className="row">
        <Toast />
        <h1>Вход</h1>
        {formErrorMessage ? (
          <div className="alert alert-danger">{formErrorMessage}</div>
        ) : null}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(logInFormError(""));
            dispatch(logIn(formControls));
            navigate(-1);
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
          <Button disabled={!isFormValid} type="primary">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
