import { Link, Breadcrumbs } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export function Navigation() {
  return (
    <Breadcrumbs sx={{ flexGrow: 2 }}>
      <Link
        underline="none"
        color="white"
        component={RouterLink}
        to={"/add_post"}
      >
        Добавить пост
      </Link>
      <Link underline="none" color="white" component={RouterLink} to={"/users"}>
        Пользователи
      </Link>
    </Breadcrumbs>
  );
}
