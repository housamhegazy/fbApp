import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { auth } from "../firebase/config";
import { deleteUser } from "firebase/auth";
import Loading from "components/Loading";

export default function Profile() {
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
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  });
  {
    loading && (
      <Loading/>
    );
  }
  if (user) {
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
        <Stack sx={{}}>
          <Typography variant="body1">{`Username: ${user.displayName}`}</Typography>
          <Typography
            sx={{ py: 1 }}
            variant="body1"
          >{`Email: ${user.email}`}</Typography>
          <Typography variant="body1">
            {`Last login from :`}
            <Moment fromNow>{user.metadata.lastSignInTime}</Moment>
          </Typography>
          <Typography sx={{ py: 1 }} variant="body1">
            {" "}
            {`Account created from: `}{" "}
            <Moment fromNow>{user.metadata.creationTime}</Moment>
          </Typography>
        </Stack>
        <Button
          sx={{ my: "20px" }}
          variant="contained"
          color="error"
          onClick={() => {
            DeleteUser();
          }}
        >
          Delete Account
        </Button>
      </Box>
    );
  }
}
