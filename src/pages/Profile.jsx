import { Box,Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { auth } from "../firebase/config";
import { deleteUser } from "firebase/auth";
import Loading from "components/Loading";
import { storage } from "../firebase/config";
import { confirm } from "react-confirm-box";
import Posts from "../components/Posts";
import { useTheme } from "@mui/system";
import AddPost from "../components/AddPost";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { BorderBottomRounded } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
export default function Profile({handleClick}) {
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const DeleteUser = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };
  //confirmation message option
  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };
  const message = (
    <h4 style={{ color: "black" }}>
      Are you sure , you want delete your account?!!{" "}
    </h4>
  );
  const onClick = async () => {
    // @ts-ignore
    const result = await confirm(message, options);
    if (result) {
      DeleteUser();
      return;
    }
    console.log("You click No!");
  };
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, []);

  {
    loading && <Loading />;
  }
  if (user) {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Stack
            sx={{
              height: "200px",
              width: "100%",
              justifyContent: "end",
              alignItems: "center",
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
            className="profileback"
          />
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              position:"relative",
              mt:"-40px",
              mb: 2,
            }}
          >
            <Avatar sx={{width: "80px",
                height: "80px"}} alt="Travis Howard" src={user.photoURL} />
            <Typography
              sx={{ mx: "20px", mt: "30px", color: theme.palette.text.main }}
              variant="body1"
            >
              {user.displayName}
            </Typography>
          </Stack>

          <Divider
            sx={{ width: "100%" }}
            orientation="horizontal"
            variant="fullWidth"
            component="div"
          />
        </Box>

        <Stack direction="row" sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                sx={{
                  width: { xs: "90%", sm: "350px" },
                }}
                id="standard-multiline-static"
                multiline
                rows={4}
                placeholder="what is in your mind?"
                variant="standard"
              />
            </Box>
            <Posts />
          </Box>
          <Box>
            <Stack sx={{ display: { xs: "none", md: "block" } ,mx:"20px"}}>
              <Typography variant="body1">{`Username: ${user.displayName}`}</Typography>
              <Typography
                sx={{ py: 0.5 }}
                variant="body1"
              >{`Email: ${user.email}`}</Typography>
              <Typography variant="body1">
                {`Last login from :`}
                <Moment fromNow>{user.metadata.lastSignInTime}</Moment>
              </Typography>
              <Typography sx={{ py: 0.5 }} variant="body1">
                {" "}
                {`Account created from: `}{" "}
                <Moment fromNow>{user.metadata.creationTime}</Moment>
              </Typography>
              <Button
                sx={{ my: "5px" }}
                variant="contained"
                color="error"
                onClick={() => {
                  onClick();
                }}
              >
                Delete Account
              </Button>
            </Stack>
          </Box>
        </Stack>
        <AddPost handleClick={handleClick} />
      </Box>
    );
  }
}
