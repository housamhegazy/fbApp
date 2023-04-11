import * as React from "react";

import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ArticleIcon from "@mui/icons-material/Article";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { HowToReg, Login, Logout } from "@mui/icons-material";
import { styled, Switch } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
function ResponsiveDrawer({
  darkmoodFunc,
  theme,
  handleDrawerToggle,
  mobileOpen,
  user,
  drawerWidth,
  setMobileOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const myList = [
    {
      title: "profile",
      icon: <AccountBoxIcon color="primary" />,
      pathname: "/profile",
    },
    { title: "home", icon: <HomeIcon color="primary" />, pathname: "/" },
    {
      title: "articles",
      icon: <ArticleIcon color="primary" />,
      pathname: "/articles",
    },
    {
      title: "groups",
      icon: <GroupsIcon color="primary" />,
      pathname: "/groups",
    },
    {
      title: "marketplace",
      icon: <StorefrontIcon color="primary" />,
      pathname: "/marketplace",
    },
    {
      title: "friends",
      icon: <PeopleOutlineIcon color="primary" />,
      pathname: "/friends",
    },
    {
      title: "settings",
      icon: <SettingsApplicationsIcon color="primary" />,
      pathname: "/settings",
    },
  ];

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));
  const signout = () => {
    signOut(auth)
      .then(() => {
       navigate("/")
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const drawer = (
    <div>
      {/* dark mood */}
      <ListItem disablePadding sx={{ my: 2 }}>
        <ListItemIcon>
          <MaterialUISwitch
            onChange={() => {
              darkmoodFunc();
            }}
            sx={{ mr: 1 }}
            defaultChecked={theme.palette.mode === "dark"}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ textTransform: "capitalize" }}
          primary={`${theme.palette.mode} mood`}
        />
      </ListItem>

      <Divider />
      <List>
        {user &&
          myList.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                onClick={(eo) => {
                  navigate(item.pathname);
                  setMobileOpen(false);
                }}
                sx={{
                  backgroundColor:
                    location.pathname === item.pathname
                      ? theme.palette.action.focus
                      : null,
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}

        {!user && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/signin");
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <Login color="primary" />
                </ListItemIcon>
                <ListItemText primary={"sign in"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/signup");
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <HowToReg color="primary" />
                </ListItemIcon>
                <ListItemText primary={"sign up"} />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {/* sign out */}
        {user && (
          <ListItem disablePadding sx={{ mt: 3 }}>
            <ListItemButton
              onClick={() => {
                signout();
                setMobileOpen(false);
              }}
            >
              <ListItemIcon>
                <Logout color="error" />
              </ListItemIcon>
              <ListItemText primary={"sign out"} sx={{ color: "red" }} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
