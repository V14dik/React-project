import { User } from "./User/User";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/actions/user";
import { useEffect } from "react";
import { Toast } from "../UI/Toast/Toast";

export const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  });
  const { users } = useSelector(({ user }) => user);
  return (
    <div className="container text-center">
      <h2>Users</h2>
      <div className="row row-cols-4">
        <Toast />
        {users.length ? (
          users.map((user, index) => {
            return (
              <User
                user={user}
                index={index}
                users={users}
                key={user.id + user.email}
              />
            );
          })
        ) : (
          <div className="text-center w-100">
            <div className="spinner-border" role="status" />
          </div>
        )}
      </div>
    </div>
  );
};
