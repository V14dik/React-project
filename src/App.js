import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./component/Registration";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/registration" element={<Registration />} />
      </Routes>
    );
  }
}

export default App;
