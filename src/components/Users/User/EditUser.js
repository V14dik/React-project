import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../../../store/actions/user";

export const EditUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(({ user }) => user);
  const id = useParams().id;
  const user = users[id];
  const name = React.createRef();
  const mail = React.createRef();

  const saveChanges = () => {
    user.userName = name.current.value;
    user.userMail = mail.current.value;
    dispatch(changeUser(user, id));
  };

  return (
    <div className="container d-flex flex-column justify-content-around align-items-center gap-2 py-2 border border-4 border-success w-50">
      <img
        src="https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png"
        className=" w-75 "
      />
      <div className="d-flex flex-column gap-2 w-75">
        <label htmlFor="user_name">Name:</label>
        <input id="user_name" defaultValue={user.userName} ref={name} />
        <label htmlFor="user_mail">Mail:</label>
        <input id="user_mail" defaultValue={user.userMail} ref={mail} />
      </div>
      <Link to={"/users"} onClick={saveChanges} className="btn btn-success">
        Save
      </Link>
    </div>
  );
};
