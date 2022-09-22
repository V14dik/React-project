import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { HelloWorld } from "./components/HelloWorld";
import { LogIn } from "./components/LogIn/LogIn";
import RegistrationForm from "./components/Registration/Registration";
import { EditUser } from "./components/Users/User/EditUser";
import { Users } from "./components/Users/Users";
import { AddPost } from "./components/AddPost/AddPost";
import { Header } from "./components/Header/Header";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add_post" element={<AddPost />} />
          <Route path="/user/:id" element={<EditUser />} />
          <Route path="/" element={<HelloWorld />} />
        </Routes>
      </>
    );
  }
}

export default App;
