// firebase get data
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import { collection, deleteDoc, orderBy, query } from "firebase/firestore";
import {
  Avatar,
  Box,
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
import {
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  Bookmark,
} from "@mui/icons-material";
import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "./Loading";
import { doc, updateDoc, deleteField } from "firebase/firestore";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function GetPosts({ user }) {
  //   const [value, loading, error] = useCollection(collection(db, user.uid));
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

  const renderMenu = (
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
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>delete</MenuItem>
    </Menu>
  );

  if (loading) {
    return (
      <Loading/>
    )
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
                    aria-label="recipe"
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
                image={
                  "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
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
              {renderMenu}
            </Card>
          );
        })}
      </Box>
    );
  }
}
