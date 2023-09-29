import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Link,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/actions/user";
import { Logout } from "@mui/icons-material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Navigation } from "./Navigation/Navigation";

export function Header() {
  const dispatch = useDispatch();
  const { isLogIn } = useSelector(({ user }) => user);
  const userLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link component={RouterLink} to={"/"} underline="none">
            <Typography variant="h6" color={"white"}>
              Sports Hub
            </Typography>
          </Link>

          <Navigation />
          <AccountCircleIcon
            onClick={handleClick}
            fontSize={"large"}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            color="white"
          />
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        {isLogIn ? (
          <MenuItem
            onClick={userLogOut}
            underline="none"
            color="inherit"
            component={RouterLink}
            to={"/"}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Выход
          </MenuItem>
        ) : (
          <div>
            <MenuItem
              underline="none"
              color="inherit"
              component={RouterLink}
              to={"/registration"}
            >
              <ListItemIcon>
                <PersonAddAltIcon fontSize="small" />
              </ListItemIcon>
              Регистрация
            </MenuItem>
            <MenuItem
              underline="none"
              color="inherit"
              component={RouterLink}
              to={"/logIn"}
            >
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              Вход
            </MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
}
