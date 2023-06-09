// send list of images to local storage and download it to page and delete
import React from "react";
import { Box, Button, Stack } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
export default function Marketplace() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  //get image from input
  const [image, setimages] = useState(null);
  const storage = getStorage();
  //get images from database
  const [imageList, setImageList] = useState([]);
  // imagesListRef to download list
  const listRef = ref(storage, `imagesList/${user.uid}`);

  //upload image function
  const sendimagesList = () => {
    if (image === null) {
      return;
    }
    //image ref to upload image
    // هنا بنشئ اسم للثوره عند رفعها
    const imageRef = ref(
      storage,
      `imagesList/${user.uid}/${image.name} + v4()`
    );
    // @ts-ignore
    const upload = uploadBytesResumable(imageRef, image);
    progress(upload);
    uploadBytesResumable(imageRef, image)
      .then((snapshot) => {
        //download the last image uploaded
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      })
      .then(() => console.log("uploaded"));
  };

  //progress file upload function
  const progress = (uploadTask) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  //download list function
  useEffect(() => {
    listAll(listRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (!imageList.includes(url)) {
            setImageList((prev) => [...prev, url]);
          }
        });
      });
    });
  }, []);

  //delete images function
  const deleteFromFirebase = (url) => {
    //1.
    let pictureRef = ref(storage, url);
    //2.
    deleteObject(pictureRef)
      .then(() => {
        // File deleted successfully
        //3.
        setImageList(imageList.filter((image) => image !== url));
        alert("Picture is deleted successfully!");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  return (
    <div style={{ padding: "10px" }}>
      <form style={{ marginBottom: "20px", textAlign: "center" }}>
        <Button>
          <label htmlFor="uplodPhoto">upload photo</label>
        </Button>
        <input
          id="uplodPhoto"
          onChange={(e) => {
            setimages(e.target.files[0]);
          }}
          type="file"
          style={{ display: "none" }}
        />
        <Button
          onClick={() => {
            sendimagesList();
          }}
          variant="outlined"
        >
          send
        </Button>
      </form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap:"wrap"
        }}
      >
        {imageList.map((image) => {
          return (
            <Stack key={image}>
              <img
                key={image}
                alt="profile"
                src={`${image}`}
                width="200px"
                height={"200px"}
                style={{ borderRadius: "10px" }}
              />
              <Button
                onClick={() => {
                  deleteFromFirebase(image);
                }}
              >
                delete
              </Button>
            </Stack>
          );
        })}
      </Box>
    </div>
  );
}
