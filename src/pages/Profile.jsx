import {
  Box,
  Avatar,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { auth } from "../firebase/config";
import { deleteUser } from "firebase/auth";
import Loading from "components/Loading";
import { confirm } from "react-confirm-box";
import Posts from "../components/Posts";
import { useTheme } from "@mui/system";
import AddPost from "../components/AddPost";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function Profile() {
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="post added successfully"
        // action={action}
        sx={{ backgroundColor: "green" }}
      />
    </div>
  );

  //end snack bar

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

  // start profile photo
  const [profileimage, setprofileimage] = useState(null);
  // store image from firebase link (from db to local)
  const [profileUrl, setprofileUrl] = useState(
    user
      ? user.photoURL ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
      : null
  );
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  //==================================
  //==================================
  //send profile photo to reference in storage
  //==================================
  //==================================
  const sendprofileImage = () => {
    if (profileimage === null) {
      return;
    }
    const imageRef = ref(storage, `UsersProfileImage/${user.uid}/profimage`);
    // send file to storage
    uploadBytes(imageRef, profileimage)
      .then((snapshot) => {
        getDownloadURL(
          ref(storage, `UsersProfileImage/${user.uid}/profimage`)
        ).then((url) => {
          setprofileUrl(url);
        });
      })
      .then(() => console.log("uploaded"));
  };

  //==================================
  //==================================
  //get profile photo from firebase storage
  //==================================
  //==================================

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      getDownloadURL(ref(storage, `UsersProfileImage/${user.uid}/profimage`))
        .then((url) => {
          setprofileUrl(url);
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              console.log("File doesnt exist");
              break;
            case "storage/unauthorized":
              console.log(" User doesnt have permission to access the object");
              break;
            case "storage/canceled":
              console.log(" storage/canceled");
              break;
            case "storage/unknown":
              console.log(
                " Unknown error occurred, inspect the server response"
              );
              break;
            default:
              console.log(" downloaded succesfully");
          }
        });
    }
  }, []);

  if (error) {
    return <Typography>error......</Typography>;
  }
  if (loading) {
    return <Loading />;
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
              position: "relative",
              mt: "-40px",
              mb: 2,
            }}
          >
            <Avatar
              sx={{ width: "80px", height: "80px" }}
              alt="Travis Howard"
              src={profileUrl}
            />
            <input
              onChange={(e) => {
                setprofileimage(e.target.files[0]);
              }}
              type="file"
            />
            <Button
              onClick={() => {
                sendprofileImage();
              }}
            >
              send
            </Button>
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
                  mt: "20px",
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
            <Stack sx={{ display: { xs: "none", md: "block" }, mx: "20px" }}>
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
        {snackbar}
      </Box>
    );
  }
}
