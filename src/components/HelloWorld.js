import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/actions/user";

export const HelloWorld = () => {
  const dispatch = useDispatch();
  const { isLogIn } = useSelector(({ user }) => user);
  const userLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  return (
    <div>
      <h1>Hello World </h1>
      <Link to={"/registration"}>Регистрация</Link>
      <br />
      {isLogIn ? (
        <Link to={"/"} onClick={userLogOut}>
          Выход
        </Link>
      ) : (
        <Link to={"/logIn"}>Вход</Link>
      )}
      <br />
      <Link to={"/users"}>Пользователи</Link>
      <br />
      <Link to={"/add_post "}>Добавить пост</Link>
    </div>
  );
};
