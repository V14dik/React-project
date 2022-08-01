import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import {
  changeControl,
  registrationFormError,
} from "../../store/actions/registration";
import { registerAccount } from "../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../UI/Toast/Toast";

function RegistrationForm() {
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
      </div>
    </div>
  );
}

export default RegistrationForm;
