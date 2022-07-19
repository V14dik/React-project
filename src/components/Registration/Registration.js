import React, { Component } from "react";
import classes from "./Registration.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { validateEmail } from "../../utils/validateEmail";
import axios from "axios";

class Registration extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 8,
        },
      },
      repeatPassword: {
        value: "",
        type: "password",
        label: "Repeat Password",
        errorMessage: "Пароли должны совпадать",
        valid: false,
        touched: false,
        validation: {
          required: true,
          isRepeatPassword: true,
        },
      },
    },
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    if (validation.isRepeatPassword) {
      isValid = value === this.state.formControls.password.value;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({ formControls, isFormValid });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          control={control}
          onChange={(event) => this.onChangeHandler(event, controlName)}
          key={controlName + index}
        />
      );
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  async registerHandler(formControls) {
    console.log(formControls);
    const regData = {
      email: formControls.email.value,
      password: formControls.password.value,
      re_password: formControls.repeatPassword.value,
    };
    let url = "http://localhost:8000/api/v1/auth/jwt/register/";
    const response = await axios.post(url, regData);
    const data = response.data;
    console.log(data);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Регистрация</h1>
          <form
            className={classes.RegistrationForm}
            onSubmit={this.submitHandler}
          >
            {this.renderInputs()}
            <Button
              disabled={!this.state.isFormValid}
              type="primary"
              onClick={() => {
                this.registerHandler(this.state.formControls);
              }}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
