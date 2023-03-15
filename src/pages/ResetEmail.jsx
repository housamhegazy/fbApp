import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResetEmail() {
  const theme = useTheme();
  const [resetPassError, setresetpass] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // open modal of forget pssword
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: theme.palette.background.default,
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const onSubmit = (data) =>
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setresetpass("message send to email check it");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setresetpass(errorCode);
        console.log(data);
      });
  return (
    <Box>
      {/* forget password modal */}
      <Button
        variant="outlined"
        onClick={() => {
          handleOpen();
        }}
      >
        forget password{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography
            sx={{ my: "20px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            type your email
          </Typography>
          <TextField
            {...register("email", {
              required: { value: true, message: "required field" },
              maxLength: { value: 20, message: "max length 20" },
            })}
            id="outlined-required"
            label="email"
            error={Boolean(errors.email)}
            helperText={
              Boolean(errors.email) ? `${errors.email.message}` : null
            }
          />
          <Button sx={{ my: "20px" }} variant="contained" type="submit">
            send code
          </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {resetPassError}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
