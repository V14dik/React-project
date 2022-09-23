import React from "react";
import { deleteUser } from "../../../store/actions/user";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export const User = (props) => {
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(deleteUser(props.users, props.index));
  };

  return (
    <Card>
      <CardMedia
        image="https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png"
        alt="User"
        component="img"
      />
      <CardContent>
        <Typography
          gutterBottom
          align="center"
          variant="subtitle2"
          component="p"
          color="black"
        >
          {props.user.email}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={"/user/" + props.index} underline="none">
          <Button variant="contained" size="small">
            Edit
          </Button>
        </Link>

        <Button onClick={onDeleteHandler} variant="contained" size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
