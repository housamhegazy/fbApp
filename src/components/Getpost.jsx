// firebase get data
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import {
  doc,
  updateDoc,
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
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import CustomizedSnackbars from "./AlertSnack";
import {
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  Bookmark,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "./Loading";
import { confirm } from "react-confirm-box";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function GetPosts({ user }) {
  const [value, loading, error] = useCollection(
    query(collection(db, user.uid), orderBy("id", "desc"))
  );
  //icon menu
  const [anchorEl, setAnchorEl] = useState(null);

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

  if (loading) {
    return <Loading />;
  }
  if (value) {
    return (
      <Box sx={{ flexGrow: "3" }} component="main">
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
