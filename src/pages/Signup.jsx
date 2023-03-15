import { Box, Button, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/system";
import Loading from "components/Loading";
export default function Signup() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = useTheme()
  const [erroeMessage, seterroeMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>
  createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: data.username,
        })
          .then(() => {
            navigate("/profile")
          })
          .catch((error) => {
            seterroeMessage(error.message)
            // ...
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterroeMessage(errorCode)
        // ..
      });
 

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  })
  {
    loading && (
      <Loading/>
    );
  }

if(!user){
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "90vh",
          alignItems: "center",
        }}
      >
        <Typography sx={{ my: "20px" }} variant="h5">
          Create account
        </Typography>
        <Box onSubmit={handleSubmit(onSubmit)}
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
        >
          <TextField
            {...register("username", {
              required: { value: true, message: "required field" },
              maxLength: { value: 20, message: "max length 20" },
            })}
            error={Boolean(errors.username)}
            helperText={
              Boolean(errors.username) ? `${errors.username.message}` : null}
            label="username"
            placeholder="username:"
          />
          <TextField
            {...register("email", {
              required: { value: true, message: "required field" },
              maxLength: { value: 20, message: "max length 20" },
            })}
            error={Boolean(errors.email)}
            helperText={
              Boolean(errors.email) ? `${errors.email.message}` : null}
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
              Boolean(errors.password) ? `${errors.password.message}` : null}
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
          >
            Sign up
          </Button>
          <Typography sx={{ my: "20px" }} variant="body1">
            {" "}
            you already have account? <NavLink style={{color:theme.palette.text.primary}} to="/signin">sign in </NavLink>
          </Typography>
        </Box>
        <Typography sx={{ my: "20px",color:"red" }} variant="body1">
          {erroeMessage}
        </Typography>
      </Box>
    )
}
}
