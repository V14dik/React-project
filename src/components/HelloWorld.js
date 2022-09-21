import React from "react";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/actions/user";
import { Header } from "./Header/Header";

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
      <Header />
      <Link underline="none" color="inherit" component={"span"}>
        <RouterLink to={"/registration"}>Регистрация</RouterLink>
      </Link>
      <br />
      {isLogIn ? (
        <Link
          underline="none"
          color="inherit"
          onClick={userLogOut}
          component={"span"}
        >
          <RouterLink to={"/"}>Выход</RouterLink>
        </Link>
      ) : (
        <Link underline="none" color="inherit" component={"span"}>
          <RouterLink to={"/logIn"}>Вход</RouterLink>
        </Link>
      )}
      <br />
    </div>
  );
};
