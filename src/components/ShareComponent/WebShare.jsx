// https://www.npmjs.com/package/react-share
import { Share } from "@mui/icons-material";
import "./Webshare.css";
import { Button, IconButton, Stack } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  EmailIcon,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperIcon,
  LineIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  TelegramShareButton
} from "react-share";

import { FacebookIcon, FacebookMessengerIcon, LinkedinIcon } from "react-share";
import Menu from '@mui/material/Menu';

export default function ShareComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const shareURl = "https://www.youtube.com/watch?v=9WzIACv_mxs";
  return (
    <div>
      <IconButton
         onClick={handleClick}
        aria-label="share"
      >
        <Share />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <FacebookShareButton
          url={shareURl}
          quote="share to facebook now"
          hashtag="#portfolio"
        >
          <FacebookIcon size={"25px"} />
        </FacebookShareButton>
        <FacebookMessengerShareButton appId={shareURl} url={shareURl}>
          <FacebookMessengerIcon size={"25px"} />
        </FacebookMessengerShareButton>
        <EmailShareButton url={shareURl}>
          <EmailIcon
            size={"25px"}
            style={{ marginRight: "5px", marginLeft: "5px" }}
          />
        </EmailShareButton>
        <InstapaperShareButton url={shareURl}>
          <InstapaperIcon
            size={"25px"}
            style={{ marginRight: "5px", marginLeft: "5px" }}
          />
        </InstapaperShareButton>
        <LineShareButton url={shareURl}>
          <LineIcon
            size={"25px"}
            style={{ marginRight: "5px", marginLeft: "5px" }}
          />
        </LineShareButton>
        <LinkedinShareButton url={shareURl}>
          <LinkedinIcon
            size={"25px"}
            style={{ marginRight: "5px", marginLeft: "5px" }}
          />
        </LinkedinShareButton>
        <PinterestShareButton url={shareURl} media="hello">
          <PinterestIcon
            size={"25px"}
            style={{ marginRight: "5px", marginLeft: "5px" }}
          />
        </PinterestShareButton>
        <TwitterShareButton url={shareURl}>
          <TwitterIcon
            size={"25px"}
            style={{ marginRight: "5px", marginLeft: "5px" }}
          />
        </TwitterShareButton>
        <WhatsappShareButton url={shareURl}>
          <WhatsappIcon
            size={"25px"}
            style={{ marginRight: "5px", marginLeft: "5px" }}
          />
        </WhatsappShareButton>
        <TelegramShareButton url={shareURl}>
          <TelegramIcon
            size={"25px"}
            style={{ marginRight: "5px", marginLeft: "5px" }}
          />
        </TelegramShareButton>
      </Menu>
    </div>
  );
}













// import { Share } from "@mui/icons-material";
// import "./Webshare.css";
// import { Button, IconButton, Stack } from "@mui/material";
// import React, { useState, useRef, useEffect } from "react";
// import {
//   FacebookShareButton,
//   FacebookMessengerShareButton,
//   EmailShareButton,
//   EmailIcon,
//   InstapaperShareButton,
//   LineShareButton,
//   LinkedinShareButton,
//   PinterestShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   InstapaperIcon,
//   LineIcon,
//   PinterestIcon,
//   TwitterIcon,
//   WhatsappIcon,
//   TelegramIcon,
//   TelegramShareButton
// } from "react-share";
// import { FacebookShareCount } from "react-share";
// import { FacebookIcon, FacebookMessengerIcon, LinkedinIcon } from "react-share";
// const ShareComponent = () => {
//   const [openShare, setOpenshare] = useState(false);
//   const shareURl = "https://www.youtube.com/watch?v=9WzIACv_mxs";
//   const menuRef = useRef(null);
//   useEffect(() => {
//     let handler = (e) => {
//       if (!menuRef.current.contains(e.target)) {
//         //return true if the event target is inside the menu
//         //return false if the event target is outside the menu
//         setOpenshare(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => {
//       document.removeEventListener("mousedown", handler);
//     };
//   }, []);

  
//   return (
//     <div className="web-share" ref={menuRef}>
//       <Stack className={`shareMenu ${openShare ? "active" : "inActive"}`}>
        // <FacebookShareButton
        //   url={shareURl}
        //   quote="share to facebook now"
        //   hashtag="#portfolio"
        // >
        //   <FacebookIcon size={"25px"} />
        // </FacebookShareButton>
        // <FacebookMessengerShareButton appId={shareURl} url={shareURl}>
        //   <FacebookMessengerIcon size={"25px"} />
        // </FacebookMessengerShareButton>
        // <EmailShareButton url={shareURl}>
        //   <EmailIcon
        //     size={"25px"}
        //     style={{ marginRight: "5px", marginLeft: "5px" }}
        //   />
        // </EmailShareButton>
        // <InstapaperShareButton url={shareURl}>
        //   <InstapaperIcon
        //     size={"25px"}
        //     style={{ marginRight: "5px", marginLeft: "5px" }}
        //   />
        // </InstapaperShareButton>
        // <LineShareButton url={shareURl}>
        //   <LineIcon
        //     size={"25px"}
        //     style={{ marginRight: "5px", marginLeft: "5px" }}
        //   />
        // </LineShareButton>
        // <LinkedinShareButton url={shareURl}>
        //   <LinkedinIcon
        //     size={"25px"}
        //     style={{ marginRight: "5px", marginLeft: "5px" }}
        //   />
        // </LinkedinShareButton>
        // <PinterestShareButton url={shareURl} media="hello">
        //   <PinterestIcon
        //     size={"25px"}
        //     style={{ marginRight: "5px", marginLeft: "5px" }}
        //   />
        // </PinterestShareButton>
        // <TwitterShareButton url={shareURl}>
        //   <TwitterIcon
        //     size={"25px"}
        //     style={{ marginRight: "5px", marginLeft: "5px" }}
        //   />
        // </TwitterShareButton>
        // <WhatsappShareButton url={shareURl}>
        //   <WhatsappIcon
        //     size={"25px"}
        //     style={{ marginRight: "5px", marginLeft: "5px" }}
        //   />
        // </WhatsappShareButton>
        // <TelegramShareButton url={shareURl}>
        //   <TelegramIcon
        //     size={"25px"}
        //     style={{ marginRight: "5px", marginLeft: "5px" }}
        //   />
        // </TelegramShareButton>
//       </Stack>

      // <IconButton
      //   onClick={() => {
      //     setOpenshare(!openShare);
      //   }}
      //   aria-label="share"
      // >
      //   <Share />
      // </IconButton>
//     </div>
//   );
// };

// export default ShareComponent;
