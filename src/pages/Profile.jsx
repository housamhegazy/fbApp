import {
  Box,
  Avatar,
  Button,
  Stack,
  Typography,
  FormLabel,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { auth } from "../firebase/config";
import { deleteUser } from "firebase/auth";
import Loading from "components/Loading";
import { confirm } from "react-confirm-box";
import Posts from "../components/getpostsfromFB/Posts";
import { useTheme } from "@mui/system";
import AddPost from "../components/addPostsToFB/AddPost";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Close } from "@mui/icons-material";
import { useContext } from "react";
import { ProfileImageContext } from "../Context/ProfileImage";
export default function Profile() {
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);
  //get profile image from context file
  const {myURL,setUrl} = useContext(ProfileImageContext)

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
  const [preview, setpreviw] = useState(null);
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
            setUrl(url);
            setprofileimage(null)
            setpreviw(null);
          });
        
      })
      .then(() => console.log("uploaded"))
      .catch((err) => console.log(err.message));
  };
 
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
          {/* start profile image */}
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
            <FormLabel
              htmlFor="upload"
              sx={{
                position: "relative",
                cursor: "pointer",
                width: "100px",
                height: "100px",
              }}
            >
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                alt="Travis Howard"
                src={myURL}
              />
              <Box
                className="overlay"
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  borderRadius: "50%",
                  opacity: "0",
                  "&:hover": { backgroundColor: "#1f1812bf", opacity: "1" },
                  fontSize: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                change
              </Box>
            </FormLabel>
            <input
              style={{ display: "none" }}
              onChange={(e) => {
                setprofileimage(e.target.files[0]);
                setpreviw(URL.createObjectURL(e.target.files[0]));
              }}
              type="file"
              id="upload"
            />
            {preview && (
              <Box
                sx={{
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  top: "0px",
                  left: "0px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#21171fab",
                  zIndex: "100000000",
                  
                }}
              >
                <img style={{ maxHeight: "80%" ,maxWidth:"90%"}} alt="prev" src={preview} />
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={sendprofileImage}
                >
                  submit
                </Button>
                <IconButton
                
                color='error'
                  sx={{
                    position: "absolute",
                    top: "80px",
                    right: "20px",
                    cursor: "pointer",
                    backgroundColor: "white",
                  }}
                >
                  <Close onClick={() => {
                  setpreviw(null);
                  setprofileimage(null)
                }}/>
                </IconButton>
              </Box>
            )}

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
