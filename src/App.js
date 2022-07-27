import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { HelloWorld } from "./components/HelloWorld";
import { LogIn } from "./components/LogIn/LogIn";
import RegistrationForm from "./components/Registration/Registration";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/" element={<HelloWorld />} />
      </Routes>
    );
  }
}

export default App;
