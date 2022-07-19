import React, { Component } from 'react';
import classes from './Registration.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { validateEmail } from '../../utils/validateEmail';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount, increment } from '../../store';

function RegistrationForm() {
  // Rule 2: call hooks in function component
  const count = useSelector(selectCount);

  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row">
        <h1>Регистрация {count}</h1>
        <form
          className={classes.RegistrationForm}
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(increment(3));
          }}
        >
          {/* {this.renderInputs()} */}
          <Button disabled={false} type="primary">
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}

class Registration extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        defaultErrorMessage: 'Введите корректный email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        defaultErrorMessage: 'Введите корректный пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 8,
        },
      },
      repeatPassword: {
        value: '',
        type: 'password',
        label: 'Repeat Password',
        defaultErrorMessage: 'Пароли должны совпадать',
        errorMessage: 'Пароли должны совпадать',
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
      isValid = value.trim() !== '' && isValid;
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

    if (control.errorMessage !== control.defaultErrorMessage) {
      control.errorMessage = control.defaultErrorMessage;
    }

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
    try {
      const regData = {
        email: formControls.email.value,
        password: formControls.password.value,
        re_password: formControls.repeatPassword.value,
      };
      let url = 'http://localhost:8000/api/v1/auth/jwt/register/';
      const response = await axios.post(url, regData);
      const data = response.data;
      const token = data.access;
      localStorage.setItem('token', token);
    } catch (error) {
      const formControls = { ...this.state.formControls };
      Object.keys(error.response.data).forEach((name) => {
        formControls[name].valid = false;
        formControls[name].errorMessage = error.response.data[name];
      });
      this.setState({ formControls });
    }
  }

  render() {
    return <RegistrationForm />;
  }
}

export default Registration;
