import React from "react";

function isInvalid({ valid, touched }) {
  return !valid && touched;
}

const Input = (props) => {
  const control = props.control;
  const inputType = props.type;
  const htmlFor = `${inputType}-${Math.random()}`;
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={htmlFor}>
        {props.label}
      </label>

      <input
        className="form-control"
        type={inputType}
        id={htmlFor}
        value={control.value}
        onChange={props.onChange}
      />
      {isInvalid(control) ? (
        <div className="alert alert-danger">{control.errorMessage}</div>
      ) : null}
    </div>
  );
};

export default Input;
