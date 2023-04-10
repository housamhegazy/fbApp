//send only one image to local storage and download url

import { Button } from "@mui/material";
import { auth } from "../firebase/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()
  //=========================
  //== profile image variables
  //==========================
  //store profile image from input
  const [profileimage, setprofileimage] = useState(null);
  // store image from firebase link (from db to local)
  const [profileUrl, setprofileUrl] = useState("");
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();
 
  //==================================
  //==================================
  //send profile photo to reference in storage
  //==================================
  //==================================   
  const sendprofileImage = () => {
    // send file to storage
    const imageRef = ref(storage, `Articles/${user.uid}/profimage.jpg`);
    uploadBytes(imageRef, profileimage)
      .then((snapshot) => {
        // هنا بنحصل على الرابط حتى يحدث تحديث فوري للصوره
          getDownloadURL(ref(storage, `Articles/${user.uid}/profimage.jpg`)).then((url) => {
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
    if(!user&&!loading){
      navigate('/')
    }
    if(user){
      getDownloadURL(ref(storage, `Articles/${user.uid}/profimage.jpg`))
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
    }
    
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
