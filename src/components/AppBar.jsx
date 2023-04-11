import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useRef } from "react";
import { useState } from "react";
import { Avatar, Link } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileImageContext } from "../Context/ProfileImage";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Appbar({ drawerWidth, handleDrawerToggle }) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()
  const [showMobilemenu, setshowMobilemenu] = useState(false);
  const rerfmenuMobile = useRef(null);
  const [showMenu, setshowMenu] = useState(false);
  const rerfmenu = useRef(null);
//get profile photo url from context
  const {myURL} = useContext(ProfileImageContext)
  //menu mobile screan
  const renderMobileMenu = (
    <Menu
      anchorEl={rerfmenuMobile.current}
      open={showMobilemenu}
      onClose={() => {
        setshowMobilemenu(false);
      }}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setshowMobilemenu(false);
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  //menu bigger screan
  const renderMenu = (
    <Menu
      anchorEl={rerfmenu.current}
      open={showMenu}
      onClose={() => {
        setshowMenu(false);
      }}
    >
      <MenuItem
        onClick={() => {
          setshowMenu(false);
        }}
      >
        <Link
          href="/profile"
          underline="none"
          color={"primary"}
          variant="body1"
        >
          profile
        </Link>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setshowMenu(false);
        }}
      >
        my account
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block",cursor:"pointer" } }}
          onClick={()=>{
            navigate('/')
          }}
        >
          META
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <>
            <Box
              sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
            >
              <IconButton
                sx={{ width: "37px", height: "37px" }}
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                sx={{ width: "37px", height: "37px" }}
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                onClick={() => {
                  setshowMenu(!showMenu);
                }}
                ref={rerfmenu}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar
                  sx={{ width: "37px", height: "37px" }}
                  alt="housam"
                  src={myURL}
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                onClick={() => {
                  setshowMobilemenu(!showMobilemenu);
                }}
                ref={rerfmenuMobile}
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                //   onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
}
