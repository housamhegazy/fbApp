import { Box, Typography } from "@mui/material";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function ErrorPage(){

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
          navigate("/")
        }
      })


    if(user){
        return (
            <h1>sorry.. page not found , come back another time ..</h1>
        )
    }
}