// firebase get data
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import {  collection, orderBy, query } from "firebase/firestore";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import {
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  Bookmark,
  Close,
} from "@mui/icons-material";


import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../Loading";
import { confirm } from "react-confirm-box";
import { useContext } from "react";
import { ProfileImageContext } from "../../Context/ProfileImage";
import { useNavigate } from "react-router-dom";
import ShareComponent from "components/ShareComponent/WebShare";
import Comments from "./Comments";
import Moment from "react-moment";


const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function GetPosts({
  user,
  anchorEl,
  open,
  handleClose,
  theme,
  handelDelete,
  handleClick,
  urlfunc,deleteFromFirebase,
}) {
  const [value, loading, error] = useCollection(
    query(collection(db, user.uid), orderBy("id", "desc"))
  );
  //profile photo url from context
  const {myURL} = useContext(ProfileImageContext) 
  const navigate = useNavigate()
  const options = {
    labels: {
      confirmable: <Button variant="contained" size='small'>Confirm</Button>,
      cancellable: <Button variant="contained" size='small'>Cancel</Button>,
    },
  };
  const message = (
    <h4 style={{ color: "black" }}>
      Are you sure , you want delete your post?!!{" "}
    </h4>
  );

  const renderMenu = () => (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          handelDelete();
        }}
      >
        delete
      </MenuItem>
    </Menu>
  );
  
  if (loading) {
    return <Loading />;
  }
  if (value) {
    return (
      <Box sx={{ flexGrow: "3"}} component="main">
        {value.docs.length < 1 && (
          <Stack
            direction={"column"}
            sx={{
              height: "200px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                color: theme.palette.primary.main,
                fontSize: "25px",
              }}
            >
              Welcome To META{" "}
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              no posts yet , start adding new posts ...{" "}
            </Typography>
          </Stack>
        )}

        {value.docs.map((item) => {
          return (
            <Card
              key={item.id}
              sx={{ maxWidth: { xs: "97%", sm: 444 }, mx: "auto", my: 5 ,position:'relative'}}
            >
               {/* delete card btn */}
               <IconButton
                sx={{position:'absolute',right:'40px',top:'5px'}}
                onClick={async (id) => {
                  // @ts-ignore
                  const result = await confirm(message, options);
                  if (result) {
                    handelDelete(item.id);
                    deleteFromFirebase(urlfunc(item.id))
                    return;
                  }
                  return;
                }}
              >
                <Close color={'error'}/>
              </IconButton>
              <CardHeader
                avatar={
                  <Avatar
                  onClick={()=>{
                    navigate('/profile')
                  }}
                    sx={{
                      bgcolor: "red",
                      color: "white",
                      cursor:"pointer"
                    }}
                    src={myURL}
                  >
                    {`${user.displayName}`.charAt(0)}
                  </Avatar>
                }
                action={
                  <IconButton onClick={handleClick} aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={user.displayName}
                subheader={<Moment fromNow>{Number(item.id)}</Moment>}
                
              />
              {urlfunc(item.id) !== undefined && (
                <CardMedia
                  component="img"
                  height="194"
                  image={urlfunc(item.id)}
                  alt="Paella dish"
                />
              )}

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.data().post}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Checkbox
                  {...label}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                />
                  <ShareComponent/>
                <Box sx={{ flexGrow: "1" }} />
                <Checkbox
                  {...label}
                  icon={<BookmarkBorder />}
                  checkedIcon={<Bookmark />}
                />
              </CardActions>
             
              <Comments id={item.id}/>
              {renderMenu()}
            </Card>
          );
        })}
      </Box>
    );
  }
}
