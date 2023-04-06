// firebase get data
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import {
  doc,
  deleteDoc,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
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
  useTheme
} from "@mui/material";

import {
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  Bookmark,
} from "@mui/icons-material";


import { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../Loading";
import { confirm } from "react-confirm-box";
import { getDownloadURL,getStorage,listAll,ref } from "firebase/storage";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function GetPosts({ user }) {
  const [value, loading, error] = useCollection(
    query(collection(db, user.uid), orderBy("id", "desc"))
  );
  //icon menu
  const [anchorEl, setAnchorEl] = useState(null);
  const theme=useTheme()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //delete item from firebase
  const handelDelete = async (val) => {
    await deleteDoc(doc(db, user.uid, val));
  };

  //confirmation message option
  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
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
        }}
      >
        delete
      </MenuItem>
    </Menu>
  );
//==================================
  //==================================
  //get profile photo from firebase storage
  //==================================
  //==================================
  const [imageList, setimageList] = useState([])
  const storage = getStorage();
  const listRef = ref(storage, `postImage/${user.uid}/`);
  useEffect(() => {
    listAll(listRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (!imageList.includes(url)) {
            setimageList((prev) => [...prev, url]);
            console.log(imageList)
          }
        });
      });
    });
  }, []);
  console.log(imageList)
  if (loading) {
    return <Loading />;
  }
  if (value) {
    return (
      <Box sx={{ flexGrow: "3" }} component="main">
        {value.docs.length < 1 && (
          <Stack direction={"column"} sx={{height:"200px",alignItems:"center",justifyContent:"center"}}>
            <Typography sx={{ textAlign: "center" ,color:theme.palette.primary.main,fontSize:"25px"}}>
              Welcome To META {" "}
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
              sx={{ maxWidth: { xs: "97%", sm: 444 }, mx: "auto", my: 5 }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: "red",
                      color: "white",
                    }}
                    src={user.photoURL}
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
                subheader={"2 years ago"}
              />
               <CardMedia
                  component="img"
                  height="194"

                  image={imageList.find((url)=>`${ref(storage, url)}` === item.id) && url}

                  alt="Paella dish"
                />
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

                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Box sx={{ flexGrow: "1" }} />
                <Checkbox
                  {...label}
                  icon={<BookmarkBorder />}
                  checkedIcon={<Bookmark />}
                />
              </CardActions>
              {/* delete card btn */}
              <Button
                onClick={async (id) => {
                  // @ts-ignore
                  const result = await confirm(message, options);
                  if (result) {
                    handelDelete(item.id);
                    return;
                  }
                  return;
                }}
              >
                delete
              </Button>
              {renderMenu()}
            </Card>
          );
        })}
      </Box>
    );
  }
}
