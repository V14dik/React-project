import React from "react";
import { User } from "./User/User";
import { useSelector } from "react-redux";
import { store } from "../..";

export const Users = () => {
  const { users } = useSelector(({ user }) => user);
  return (
    <div className="container text-center">
      <h2>Users</h2>
      <div className="row row-cols-4">
        {Object.keys(users).map((user) => {
          return (
            <User
              name={users[user].userName}
              mail={users[user].userMail}
              index={user}
              users={users}
              key={users[user].userName + users[user].userMail}
            />
          );
        })}
      </div>
    </div>
  );
};
