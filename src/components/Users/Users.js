import React from "react";
import { User } from "./User/User";

export const Users = () => {
  return (
    <div className="container text-center">
      <h2>Users</h2>
      <div className="row row-cols-4">
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>
    </div>
  );
};
