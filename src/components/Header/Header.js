import { Link as RouterLink } from "react-router-dom";
import { AppBar, Breadcrumbs, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "@mui/material/Link";

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="span" sx={{ flexGrow: 2 }}>
          Sports Hub
        </Typography>
        <Breadcrumbs sx={{ flexGrow: 2 }}>
          <Link underline="none" color="white" component={"span"}>
            <RouterLink to={"/add_post"}>Добавить пост</RouterLink>
          </Link>
          <Link underline="none" color="white" component={"span"}>
            <RouterLink to={"/users"}>Пользователи</RouterLink>
          </Link>
        </Breadcrumbs>
        <AccountCircleIcon color="white" />
      </Toolbar>
    </AppBar>
  );
}
