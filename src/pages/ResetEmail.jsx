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
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    // register,
    // handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  // open modal of forget pssword
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
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

  const onSubmitEmail = (data) =>
    sendPasswordResetEmail(auth, data.email1)
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
        // variant="outlined"
        onClick={() => {
          handleOpen1();
        }}
      >
        forget password{" "}
      </Button>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          onSubmit={handleSubmit2(onSubmitEmail)}
        >
          <Typography
            sx={{ my: "20px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            type your email
          </Typography>
          <TextField
            {...register2("email1", {
              required: { value: true, message: "required field" },
              maxLength: { value: 20, message: "max length 20" },
            })}
            id="outlined-required"
            label="email1"
            error={Boolean(errors2.email1)}
            helperText={
              Boolean(errors2.email1) ? `${errors2.email1.message}` : null
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
