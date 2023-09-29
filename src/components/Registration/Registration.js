import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import {
  changeControl,
  cleanInputs,
  registrationFormError,
} from "../../store/actions/registration";
import { registerAccount } from "../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../UI/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "@mui/material";

function RegistrationForm() {
  const dispatch = useDispatch();
  const { formControls, isFormValid, formErrorMessage } = useSelector(
    ({ register }) => register
  );
  const navigate = useNavigate();
  const onChangeHandler = (event, controlName) => {
    dispatch(changeControl(formControls, event.target.value, controlName));
  };
  useEffect(() => {
    return () => {
      dispatch(cleanInputs());
    };
  }, []);

  return (
    <Container>
      <Toast />
      <h1>Регистрация</h1>
      {formErrorMessage ? (
        <div className="alert alert-danger">{formErrorMessage}</div>
      ) : null}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(registrationFormError(""));
          dispatch(registerAccount(formControls));
          //navigate(-1);
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
        <Input
          control={formControls.repeatPassword}
          type={"password"}
          label={"Repeat Password"}
          onChange={(event) => onChangeHandler(event, "repeatPassword")}
        />
        <Button disabled={!isFormValid} type="primary">
          Зарегистрироваться
        </Button>
      </form>
    </Container>
  );
}

export default RegistrationForm;
