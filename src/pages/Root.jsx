import React, { useEffect, useMemo, useState } from "react";
import Home from "./Home";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Box,
} from "@mui/material";
import getDesignTokens from "../styles/MuTheme";
import Appbar from "components/AppBar";

import { Outlet } from "react-router-dom";
import Listt from "components/List";
import Loading from "components/Loading";

export default function Root(){
  const [user, loading, error] = useAuthState(auth);
      //showlist
  const [showList, setshowList] = useState("none");
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
if(loading){
  return(
    <Loading/>
  )
}
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className={theme.palette.mode}>
          <Appbar setshowList={setshowList} showList={showList} />
          <Listt {...{ setshowList,darkmoodFunc, theme, showList }} />
        </Box>

        <Box sx={{ml:{xs:"0",md:"240px"},mt:"69px"}}>
            <Outlet/>
        </Box>
      </ThemeProvider>
    );
  }
  