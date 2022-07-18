import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./component/Registration";
import { HelloWorld } from "./component/HelloWorld";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<HelloWorld />} />
      </Routes>
    );
  }
}

export default App;
