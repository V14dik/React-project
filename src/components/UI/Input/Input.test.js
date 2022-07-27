/** * @jest-environment jsdom */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Input from "./Input";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// let container = null;
// beforeEach(() => {
//   container = document.createElement("div");
//   //document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

test("Input should contain lebel and input with transmited data", () => {
  const test = document.createElement("div");
  const control = {
    email: {
      value: "",
      errorMessage: "Введите корректный email",
      valid: false,
      touched: false,
    },
  };
  act(() => {
    ReactDOM.render(
      <Input control={control} type={"email"} label={"Email"} />,
      root
    );
    root.render(<Input control={control} type={"email"} label={"Email"} />);
    expect(container.querySelector(label).textContent).toBe("Email");
    expect(container.querySelector(input).value).toBe("");
    expect(container.querySelector(input).type).toBe("email");
  });
});
