import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { changeControl } from "../../store/actions/registration";
import { registerAccount } from "../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";

function RegistrationForm() {
  const dispatch = useDispatch();
  const { formControls, isFormValid } = useSelector(({ register }) => register);
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
