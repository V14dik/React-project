import React from "react";

function isInvalid({ valid, touched, validation }) {
  const shouldValidate = !!validation;
  return !valid && shouldValidate && touched;
}

const Input = (props) => {
  const control = props.control;
  const inputType = control.type || "text";
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(control)) {
  }

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={htmlFor}>
        {control.label}
      </label>
      {isInvalid(control) ? (
        <div className="alert alert-danger">
          {control.errorMessage || "Введите верное значение"}
        </div>
      ) : null}
      <input
        className="form-control"
        type={inputType}
        id={htmlFor}
        value={control.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
