import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Close } from "@mui/icons-material";
import {
  Box,
  TextField,
  Stack,
  Paper,
  Avatar,
  Typography,
  Button,
  Divider,
} from "@mui/material";
export default function GetCommentsFromdb({
  user,
  setcommentInput,
  sendDatatoFireBase,
  id,
  commentInput,
  deletecomment
}) {
  const [value, loading, error] = useCollection(
    collection(db, `comments${user.uid}`)
  );
  if (value) {
    return (
      <Box>
        <Box component={"form"} onSubmit={(e)=>{
            e.preventDefault()
        }}>
          <TextField
          required
            onChange={(e) => {
              setcommentInput(e.target.value);
            }}
            fullWidth
            label="comment"
            variant="filled"
            value={commentInput}
          />
          <Button
            onClick={() => {
              sendDatatoFireBase();
            }}
            fullWidth={true}
            type='submit'
          >
            comment
          </Button>
        </Box>

        <Stack>
          {value.docs.map((item) => {
            return (
                <Box key={item.id}>
                    {`${item.data().commentid}` === `${id}` && (<Paper 
                      sx={{
                        my: 1,
                        px: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Stack
                        sx={{ mr: 1, justifyContent: "center", alignItems: "center" }}
                      >
                        <Avatar sizes="small" sx={{ mr: 1 }}></Avatar>
                        {/* <Typography variant="body1" sx={{fontSize:"12px"}}>{item.data().name}</Typography> */}
                      </Stack>
                      <Divider light={true} orientation="vertical" flexItem />
                      
                      <Typography sx={{ p: 1 }}>
                        {item.data().post}
                      </Typography>
                      <Stack flexGrow={1}></Stack>
                      <Close onClick={()=>{
                        deletecomment(item.id)
                      }} sx={{ cursor: "pointer", mx: 1 }} />
                    </Paper> )}
                </Box>
            )
          })}
        </Stack>
      </Box>
    );
  }
}


