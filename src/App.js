import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { HelloWorld } from "./components/HelloWorld";
import RegistrationForm from "./components/Registration/Registration";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/" element={<HelloWorld />} />
      </Routes>
    );
  }
}

export default App;
