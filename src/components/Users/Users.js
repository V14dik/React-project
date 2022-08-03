import React from "react";
import { User } from "./User/User";
import { useSelector } from "react-redux";

export const Users = () => {
  const { users } = useSelector(({ user }) => user);
  return (
    <div className="container text-center">
      <h2>Users</h2>
      <div className="row row-cols-4">
        {Object.keys(users).map((user) => {
          return (
            <User
              user={users[user]}
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
