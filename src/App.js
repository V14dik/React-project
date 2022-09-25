import React, { Component } from "react";
import { Header } from "./components/Header/Header";
import { HomePage } from "./components/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/Registration/Registration";
import { LogIn } from "./components/LogIn/LogIn";
import { Users } from "./components/Users/Users";
import { AddPost } from "./components/AddPost/AddPost";
import { EditUser } from "./components/Users/User/EditUser";
import { EditPost } from "./components/EditPost/EditPost";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <Routes>
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add_post" element={<AddPost />} />
            <Route path="/edit_post/:id" element={<EditPost />} />
            <Route path="/user/:id" element={<EditUser />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;
