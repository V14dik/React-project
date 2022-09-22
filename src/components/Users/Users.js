import { User } from "./User/User";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/actions/user";
import { useEffect } from "react";
import { Toast } from "../UI/Toast/Toast";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  Stack,
} from "@mui/material";

export const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const { users } = useSelector(({ user }) => user);
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        component={"h1"}
        align="center"
        gutterBottom={true}
      >
        Users
      </Typography>
      <Toast />
      {users.length ? (
        <Grid container spacing={2}>
          {users.map((user, index) => {
            return (
              <Grid item sm={3} key={user.id + user.email}>
                <User user={user} index={index} users={users} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </Container>
  );
};
