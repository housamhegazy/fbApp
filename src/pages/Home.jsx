import Posts from "components/getpostsfromFB/Posts";
import Rightbar from "components/Rightbar";
import AddPost from "components/addPostsToFB/AddPost";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTheme } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase/config";

import { Stack, Box, Divider, Typography, Button } from "@mui/material";
import Loading from "components/Loading";

import Snackbar from "@mui/material/Snackbar";

import { useState } from "react";
import React from "react";
// import { Url } from '../Context/PostimageList'
export default function HomePage() {
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);

  //start snackbar
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

  const snackbar = (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="added succesfully"
        sx={{ backgroundColor: "green" }}
      />
    </div>
  );

  //end snack bar

  if (error) {
    return <Typography>error......</Typography>;
  }
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
            mb: 2,
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
          <Button variant='outlined'>
            <Link
              style={{ color: theme.palette.info.main, textDecoration: "none" }}
              to={"/signin"}
            >
              {`log in`}
            </Link>
          </Button>
        </Typography>
      </Box>
    );
  }

  // eslint-disable-next-line no-lone-blocks
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
        <AddPost {...{ handleClick }} />
        {snackbar}
      </Stack>
    );
  }
}
