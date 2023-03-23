import React, { useEffect, useMemo, useState } from "react";
import Home from "./Home";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { createTheme, CssBaseline, ThemeProvider, Box } from "@mui/material";
import getDesignTokens from "../styles/MuTheme";
import Appbar from "components/AppBar";

import { Outlet } from "react-router-dom";

import Loading from "components/Loading";
import ResponsiveDrawer from "components/myDrawer";

export default function Root() {
  const [user, loading, error] = useAuthState(auth);
  //showlist
  const [showList, setshowList] = useState("none");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 240;
  ///
  const localTheme = localStorage.getItem("localTheme");
  const [mode, setmode] = useState(
    localTheme === null ? "light" : localTheme === "light" ? "light" : "dark"
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  //dark mood function
  const darkmoodFunc = () => {
    localStorage.setItem(
      "localTheme",
      theme.palette.mode === "dark" ? "light" : "dark"
    );
    setmode(theme.palette.mode === "light" ? "dark" : "light");
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={`${theme.palette.mode}`}>
        <Appbar {...{ handleDrawerToggle, drawerWidth }} />
        <ResponsiveDrawer
          {...{
            handleDrawerToggle,
            mobileOpen,
            darkmoodFunc,
            theme,
            user,
            drawerWidth,
            setMobileOpen
          }}
        />
      </Box>

      <Box
        className={`${theme.palette.mode}`}
        sx={{
          ml: { xs: "0", sm: `${drawerWidth}px` },
          mt: { xs: "56px", sm: "64px" },
        }}
      >
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
