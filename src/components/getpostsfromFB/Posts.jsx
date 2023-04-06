import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import GetPosts from "./Getpost";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

export default function Posts() {
  //icon menu
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

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

  const [user, loading, error] = useAuthState(auth);
  //==================================
  //==================================
  //get profile photo from firebase storage
  //==================================
  //==================================
  const [imageList, setimageList] = useState([]);
  const storage = getStorage();
  const listRef = ref(storage, `postImage/${user.uid}/`);
  useEffect(() => {
    listAll(listRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (!imageList.includes(url)) {
            setimageList((prev) => [...prev, url]);
          }
        });
      });
    });
  }, []);

  const urlfunc = (id) => {
    const myUrl = imageList.find((ele) => {
      return ele.includes(id) ? ele : null;
    });
    return myUrl;
  };
  return (
    <GetPosts
      {...{
        user,
        anchorEl,
        open,
        handleClose,
        theme,
        handelDelete,
        handleClick,
        urlfunc,
      }}
    />
  );
}
