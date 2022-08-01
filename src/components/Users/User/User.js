import React from "react";

export const User = () => {
  return (
    <div className="mb-4">
      <img
        src="https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png"
        className="img-thumbnail w-75 "
      />
      <div>
        <p>User name</p>
        <p>User mail</p>
      </div>
      <div className="d-flex justify-content-around">
        <button className="btn btn-warning">edit</button>
        <button className="btn btn-danger">delete</button>
      </div>
    </div>
  );
};
