import React from "react";
import { deleteUser } from "../../../store/actions/user";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const User = (props) => {
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(deleteUser(props.users, props.index));
  };

  return (
    <div className="mb-4 d-flex justify-content-between flex-column align-items-center">
      <img
        src="https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png"
        className="img-thumbnail w-75 "
      />
      <div>
        <p>{props.user.userName}</p>
        <p>{props.user.userMail}</p>
      </div>
      <div className="d-flex justify-content-around w-100">
        <Link className="btn btn-warning" to={"/user/" + props.index}>
          edit
        </Link>
        <button className="btn btn-danger" onClick={onDeleteHandler}>
          delete
        </button>
      </div>
    </div>
  );
};
