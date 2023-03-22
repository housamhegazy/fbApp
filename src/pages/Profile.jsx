import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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

export default function Profile() {
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);
  const [image, setimage] = useState(
    "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
  );
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
    if (user) {
      setimage(user.photoURL);
    }
  }, [user]);

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
              mb: 5,
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
              mt: "-70px",
              mb: 2,
            }}
          >
            <img
              alt="housam"
              style={{
                mt: "10px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
              }}
              src={image}
            />
            <Typography
              sx={{ mx: "20px", mt: "20px", color: theme.palette.text.main }}
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
            <Stack sx={{ display: { xs: "none", md: "block" } }}>
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
        <AddPost />
      </Box>
    );
  }
}
