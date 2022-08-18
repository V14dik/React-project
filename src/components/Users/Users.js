import React from "react";
import { User } from "./User/User";
import { useSelector } from "react-redux";
import { startUrl } from "../../utils/url";
import axios from "axios";

async function getUsers() {
  let url = `${startUrl}api/v1/users/`;
  const response = await axios.get(url);
  console.log(response);
}

export const Users = () => {
  const { users } = useSelector(({ user }) => user);
  getUsers();
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
