import React from "react";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/actions/user";

export const HelloWorld = () => {
  // const dispatch = useDispatch();
  // const { isLogIn } = useSelector(({ user }) => user);
  // const userLogOut = () => {
  //   dispatch(logOut());
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  // };
  return (
    <div>
      {/* {isLogIn ? (
        <Link
          underline="none"
          color="inherit"
          onClick={userLogOut}
          component={RouterLink}
          to={"/"}
        >
          Выход
        </Link>
      ) : (
        <>
          <Link
            underline="none"
            color="inherit"
            component={RouterLink}
            to={"/registration"}
          >
            Регистрация
          </Link>
          <br />
          <Link
            underline="none"
            color="inherit"
            component={RouterLink}
            to={"/logIn"}
          >
            Вход
          </Link>
        </>
      )}
      <br /> */}
    </div>
  );
};
