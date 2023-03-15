import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system"; 
import React from "react";
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
];
const showLarg = { xs: "none", lg: "block" };
export default function Rightbar() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: showLarg,
        flexGrow: "auto",
        minWidth:"516px",
        backgroundColor: theme.palette.faveColor.main,
      }}
      pl={2}
      component="section"
    >
     <Box sx={{ position: "fixed" }}>
     <Typography sx={{ fontWeight: "300" }} mt={2} variant="h6">
        online friends
      </Typography>
      <AvatarGroup sx={{ justifyContent: "center" }} max={5}>
        <Avatar
          alt="Remy Sharp"
          src="http://mui.com/static/images/avatar/1.jpg"
        />
        <Avatar
          alt="Travis Howard"
          src="http://mui.com/static/images/avatar/2.jpg"
        />
        <Avatar
          alt="Cindy Baker"
          src="http://mui.com/static/images/avatar/3.jpg"
        />
        <Avatar
          alt="Agnes Walker"
          src="http://mui.com/static/images/avatar/4.jpg"
        />
        <Avatar
          alt="Trevor Henderson"
          src="http://mui.com/static/images/avatar/5.jpg"
        />
        <Avatar
          alt="Trevor Henderson"
          src="http://mui.com/static/images/avatar/5.jpg"
        />
        <Avatar
          alt="Trevor Henderson"
          src="http://mui.com/static/images/avatar/5.jpg"
        />
      </AvatarGroup>

      <Typography sx={{ fontWeight: "300" }} my={2} variant="h6">
        latest photos
      </Typography>
      <ImageList
        gap={3}
        sx={{ width: 400, height: 160, overflow: "hidden" }}
        cols={3}
        rowHeight={100}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              style={{ borderRadius: "5px" }}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Typography sx={{ fontWeight: "300" }} mb={1} variant="h6">
        latest conversation
      </Typography>
      <List sx={{ width: "100%", maxWidth: 488, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="http://mui.com/static/images/avatar/1.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Travis Howard"
              src="http://mui.com/static/images/avatar/2.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Cindy Baker"
              src="http://mui.com/static/images/avatar/3.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
     </Box>
    </Box>
  );
}
