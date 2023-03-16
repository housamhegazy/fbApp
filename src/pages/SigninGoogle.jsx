import {
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { auth, googleProvider } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function SigninGoogle() {
  const navigate = useNavigate();
  const GoogleSignFunc = () => {
    console.log("logedin with google");
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        
      });
  };
  
  
  return (
    <Box sx={{ my: 3 }}>
      <Button
        onClick={() => {
          GoogleSignFunc();
        }}
        variant="contained"
      >
        log in with google account
      </Button>
    </Box>
  );
}
