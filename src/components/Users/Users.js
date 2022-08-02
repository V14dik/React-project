import React from "react";
import { User } from "./User/User";
import { store } from "../..";

export const Users = () => {
  const users = store.getState().user.users;
  return (
    <div className="container text-center">
      <h2>Users</h2>
      <div className="row row-cols-4">
        {Object.keys(users).map((user) => {
          return (
            <User
              name={users[user].userName}
              mail={users[user].userMail}
              key={user}
            />
          );
        })}
      </div>
    </div>
  );
};
