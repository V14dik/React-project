import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../../../store/actions/user";
import { Toast } from "../../UI/Toast/Toast";

export const EditUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(({ user }) => user);
  const index = useParams().id;
  const user = users[index];
  const mail = React.createRef();
  const navigate = useNavigate();

  const saveChanges = () => {
    user.email = mail.current.value;
    dispatch(changeUser(user));
    navigate(-1);
  };

  return (
    <div className="container d-flex flex-column justify-content-around align-items-center gap-2 py-2 border border-4 border-success w-50">
      <Toast />
      <img
        src="https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png"
        alt="User"
        className=" w-75 "
      />
      <div className="d-flex flex-column gap-2 w-75">
        <label htmlFor="user_mail">Mail:</label>
        <input id="user_mail" defaultValue={user.email} ref={mail} />
      </div>
      <button onClick={saveChanges} className="btn btn-success">
        Save
      </button>
    </div>
  );
};
