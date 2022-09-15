import React from "react";
import { Link } from "react-router-dom";

export const HelloWorld = () => {
  return (
    <div>
      <h1>Hello World </h1>
      <Link to={"/registration"}>Регистрация</Link>
      <br />
      <Link to={"/logIn"}>Вход</Link>
      <br />
      <Link to={"/users"}>Пользователи</Link>
      <br />
      <Link to={"/add_post "}>Добавить пост</Link>
    </div>
  );
};
