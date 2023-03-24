import { Box, Typography } from "@mui/material";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  if (user) {
    return (
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection:"column"
        }}
      >
        <Typography>
          sorry.. this page under Maintenance , come back another time ..
        </Typography>
        <img alt="maintain" style={{width:"200px"}} src={"./maintain.png"}/>
      </Box>
    );
  }
}
