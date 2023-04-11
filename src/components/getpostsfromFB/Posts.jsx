import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import GetPosts from "./Getpost";
import { useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

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

  // const {imageList} = useContext(listContext)
  
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
  }, [imageList,listRef]);
// if url media not undefiend show mediain card
  const urlfunc = (id) => {
    const myUrl = imageList.find((ele) => {
      return ele.includes(id) ? ele : null;
    });
    return myUrl;
  };
  //delete images function
  const deleteFromFirebase = (url) => {
    //1.
    let pictureRef = ref(storage, url);
    //2.
    deleteObject(pictureRef)
      .then(() => {
        // File deleted successfully
        //3.
        setimageList(imageList.filter((image) => image !== url));
        alert("Picture is deleted successfully!");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
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
        deleteFromFirebase
      }}
    />
  );
}
