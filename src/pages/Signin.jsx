import { Box, Button, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import ResetEmail from "./ResetEmail";
import { useTheme } from "@mui/system";
import Loading from "components/Loading";

export default function Signin() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = useTheme()

  //login error code state
  const [errorCodeMessage, seterrorCodeMessage] = useState("");
  //login function
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        seterrorCodeMessage(errorCode);
      });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  {
    loading && (
      <Loading/>
    );
  }
  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "90vh",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            width: "50%",
            mx: "auo",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register("email", {
              required: { value: true, message: "required field" },
              maxLength: { value: 20, message: "max length 20" },
            })}
            error={Boolean(errors.email)}
            helperText={
              Boolean(errors.email) ? `${errors.email.message}` : null
            }
            label="email"
            placeholder="email:"
          />
          <TextField
            {...register("password", {
              required: { value: true, message: "required field" },
              maxLength: { value: 20, message: "max length 20" },
            })}
            error={Boolean(errors.password)}
            helperText={
              Boolean(errors.password) ? `${errors.password.message}` : null
            }
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained">
            Sign in
          </Button>

          <Typography sx={{ my: "20px" }} variant="body1">
            {" "}
            you dont have account <NavLink style={{color:theme.palette.text.primary}} to="/signup">sign up </NavLink>
          </Typography>
          <Typography sx={{ my: "20px", color: "red" }} variant="body1">
            {errorCodeMessage}
          </Typography>
          {/* forget password */}
          <ResetEmail />
        </Box>
      </Box>
    );
  }
}
