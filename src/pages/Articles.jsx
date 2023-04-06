//send only one image to local storage and download url

import { Button } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

export default function Articles() {
  //=========================
  //== profile image variables
  //==========================
  //store profile image from input
  const [profileimage, setprofileimage] = useState(null);
  // store image from firebase link (from db to local)
  const [profileUrl, setprofileUrl] = useState("");
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();
  const imageRef = ref(storage, `profile/profimage.jpg`);
  //==================================
  //==================================
  //send profile photo to reference in storage
  //==================================
  //==================================
  const sendprofileImage = () => {
    // send file to storage
    uploadBytes(imageRef, profileimage)
      .then((snapshot) => {
        // هنا بنحصل على الرابط حتى يحدث تحديث فوري للصوره
        getDownloadURL(ref(storage, `profile/profimage.jpg`)).then((url) => {
          setprofileUrl(url);
        });
      })
      .then(() => console.log("uploaded"));
  };

  //==================================
  //==================================
  //get profile photo from firebase storage
  //==================================
  //==================================

  useEffect(() => {
    getDownloadURL(ref(storage, `images/profile`))
      .then((url) => {
        // Insert url into an <img> tag to "download"
        setprofileUrl(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            console.log("File doesnt exist");
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log(" User doesnt have permission to access the object");
            break;
          case "storage/canceled":
            // User canceled the upload
            console.log(" storage/canceled");
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            console.log(" Unknown error occurred, inspect the server response");
            break;
          default :
          console.log(" downloaded succesfully");
        }
      });
  }, []);

  return (
    <div>
      <form>
        <input
          onChange={(e) => {
            setprofileimage(e.target.files[0]);
          }}
          type="file"
        />
        <Button
          onClick={() => {
            sendprofileImage();
          }}
          variant="outlined"
        >
          send
        </Button>
      </form>
      <img
        alt="profile"
        src={`${profileUrl}`}
        width="200px"
        height={"200px"}
        style={{ borderRadius: "50%" }}
      />

      {/* ========================= */}
      

    </div>
  );
}
