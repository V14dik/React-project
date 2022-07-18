import React, { Component } from "react";
import classes from "./Registration.module.css";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/Input";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

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
          isRepeatPassword: false,
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
          isRepeatPassword: false,
        },
      },
      repeatPassword: {
        value: "",
        type: "password",
        label: "Repeat Password",
        errorMessage: "Пароли доджны совпадать",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 8,
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
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  registerHandler() {
    console.log("Success");
  }

  render() {
    return (
      <div className={classes.Registration}>
        <div>
          <h1>Регистрация</h1>
          <form
            className={classes.RegistrationForm}
            onSubmit={this.submitHandler}
          >
            {this.renderInputs()}
            <Button
              disabled={!this.state.isFormValid}
              type="primary"
              onClick={this.registerHandler}
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
