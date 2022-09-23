import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../../../store/actions/user";
import { Toast } from "../../UI/Toast/Toast";
import { getUsers } from "../../../store/actions/user";
import {
  Container,
  Stack,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
} from "@mui/material";

export const EditUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);
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
    <Container maxWidth="sm">
      <Toast />
      <div style={{ alignItems: "center" }}>
        {users.length ? (
          <Card>
            <CardMedia
              image="https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png"
              alt="User"
              component="img"
              sx={{ width: 1 / 2, m: "auto" }}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                gutterBottom
                align="center"
                variant="subtitle"
                component="label"
                htmlFor="user_mail"
              >
                Mail:
              </Typography>
              <TextField
                id="user_mail"
                defaultValue={user.email}
                inputRef={mail}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={saveChanges}
                sx={{ m: "auto" }}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        ) : (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        )}
      </div>
    </Container>
  );
};
