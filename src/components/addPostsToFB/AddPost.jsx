import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
//firestore
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import "./addpost.css";
import {
  Tooltip,
  Fab,
  Box,
  Typography,
  Modal,
  TextField,
  Stack,
  Avatar,
  ButtonGroup,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/system";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PhotoIcon from "@mui/icons-material/Photo";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { CalendarMonth } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./../Loading";
import { getStorage,ref,uploadBytes } from "firebase/storage";
import { useContext } from "react";
import { ProfileImageContext } from "../../Context/ProfileImage";
export default function AddPost({handleClick}) {
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [post, setPost] = useState("");
  const theme = useTheme();
  const postId = new Date().getTime();
  //start send post image
  const [image,setImage]=useState(null)
  const storage = getStorage();
  const imageRef = ref(storage, `postImage/${user.uid}/${postId}.jpg`);
  const {myURL} = useContext(ProfileImageContext)
// 'file' comes from the Blob or File API
const sendPostImage = ()=>{
  uploadBytes(imageRef, image).then((snapshot) => {
   
    console.log('Uploaded a blob or file!');
  });
}
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "97%", sm: 400 },
    bgcolor: theme.palette.background.default,
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  // firestore send data functions
  
  const sendData = async () => {
    await setDoc(doc(db, user.uid, `${postId}`), {
      name: "Housam",
      post: post,
      id: postId,
    });
    handleClose();
  };
  if (error) {
    return <Typography>error......</Typography>;
  }
  if (loading) {
    return <Loading/>;
  }

  return (
    <Box>
      <Tooltip
        sx={{ position: "fixed", bottom: "10px", left: "10px", zIndex: "5000" }}
        title="Add Post"
      >
        <Fab
          onClick={() => {
            handleOpen();
          }}
          color="secondary"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="mymodal"
          component={"form"}
          sx={style}
          onSubmit={(e) => {
            e.preventDefault();
            sendData();
            {image !== null && sendPostImage()}
            handleClick()
            
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
            Creat Post
          </Typography>
          <Stack direction="row" sx={{ alignItems: "center", my: "10px" }}>
            <Avatar alt="Remy Sharp" src={myURL} />
            <Typography id="modal-modal-description" sx={{ mx: "10px" }}>
              {user.displayName}
            </Typography>
          </Stack>
          <TextField
            required
            onChange={(eo) => {
              setPost(eo.target.value);
            }}
            id="standard-multiline-static"
            sx={{ width: "100%", my: 2 }}
            multiline
            rows={4}
            placeholder="what is in your mind?"
            variant="standard"
          />
          <Stack direction={"row"}>
            <InsertEmoticonIcon color="primary" sx={{ mx: 1 }} />
            <label htmlFor="post"><PhotoIcon color="secondary" sx={{ mx: 1 }} /></label>
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} style={{display:"none"}} type="file" id='post'/>
            <VideocamIcon color="success" sx={{ mx: 1 }} />
            <PersonAddIcon color="error" sx={{ mx: 1 }} />
          </Stack>
          <ButtonGroup sx={{ width: "100%", mt: 2 }} variant="contained">
            <Button type="submit" sx={{ flexGrow: "1" }}>
              post
            </Button>
            <Button>
              <CalendarMonth />
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </Box>
  );
}
