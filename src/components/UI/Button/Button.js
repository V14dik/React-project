import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="btn btn-primary"
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
