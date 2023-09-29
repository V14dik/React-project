import { Link, Breadcrumbs, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export function Navigation() {
  return (
    <Breadcrumbs>
      <Link component={RouterLink} to={"/add_post"} underline="none">
        <Typography color="white">Добавить пост</Typography>
      </Link>
      <Link underline="none" component={RouterLink} to={"/users"}>
        <Typography color="white">Пользователи</Typography>
      </Link>
    </Breadcrumbs>
  );
}
