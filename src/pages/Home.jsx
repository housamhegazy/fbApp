import Posts from "components/Posts";
import Rightbar from "components/Rightbar";
import AddPost from "components/AddPost";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTheme } from "@mui/system";
import React, { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

import { Stack, Box, Divider, Typography, Skeleton } from "@mui/material";
import Loading from "components/Loading";
import CustomizedSnackbars from "../components/AlertSnack";
export default function HomePage() {
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  //alert
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  if (!user && !loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "90vh",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            color: theme.palette.primary.main,
            fontSize: "25px",
            mb:2
          }}
        >
          Welcome To META{" "}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
          }}
        >
          {` please  `}
          <NavLink style={{ color: theme.palette.info.main }} to={"/signin"}>
            {` -  log in`}
          </NavLink>
        </Typography>
      </Box>
    );
  }

  {
    loading && <Loading />;
  }

  if (user) {
    return (
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        direction="row"
      >
        <Posts />

        <Rightbar />
        <AddPost handleClick={handleClick} />
        <CustomizedSnackbars {...{ open, setOpen, handleClick, handleClose }}>
          post added successfully
        </CustomizedSnackbars>
      </Stack>
    );
  }
}
