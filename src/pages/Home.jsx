import Listt from "components/List";
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

export default function HomePage() {
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  if (!user && !loading) {
    return (
      <Box>
        <Typography
          sx={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
    loading && (
      <Loading/>
    );
  }

  if (user) {
    return (
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        direction="row"
      >
        <Posts />

        <Rightbar />
        <AddPost />
      </Stack>
    );
  }
}
