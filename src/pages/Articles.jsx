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
  const imageRef = ref(storage, `profile/profimage`);
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
        getDownloadURL(ref(storage, `profile/profimage`)).then((url) => {
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

// //video on youtupe
// //https://www.youtube.com/watch?v=YOAeBSCkArA
// import { Box, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import { storage } from "../firebase/config";
// import {
//   ref,
//   uploadBytes,
//   listAll,
//   getDownloadURL,
//   deleteObject,
// } from "firebase/storage";
// import { v4 } from "uuid";
// export default function Articles() {
//   //store image from button onchange
//   const [imageUpload, setimageUpload] = useState(null);
//   //store image from firebase
//   const [imageList, setImageList] = useState([]);
//   const imageListRef = ref(storage, "images/");

//   //send images to firebase
//   const uploadImage = () => {
//     if (imageUpload === null) {
//       return;
//     }
//     const ImageRef = ref(storage, `images/${imageUpload.name + v4()}`); //'images' is path to store images
//     uploadBytes(ImageRef, imageUpload).then((snapshot) => {
//       //to render img to page automaticly after upload it
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageList((prev) => [...prev, url]);
//       });
//     });
//   };

//   //get images from firebase and store it in imageslist state
//   useEffect(() => {
//     listAll(imageListRef).then((response) => {
//       response.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//           setImageList((prev) => [...prev, url]);
//         });
//       });
//     });
//   }, []);
//   //delete image

//   return (
//     <Box>
//       <input
//         id="fileinpu"
//         type="file"
//         onChange={(eo) => {
//           setimageUpload(eo.target.files[0]);
//         }}
//       />
//       <Button
//         onClick={() => {
//           uploadImage();
//         }}
//       >
//         upload image
//       </Button>
//       {/* map image list */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {imageList.map((url) => {
//           return (
//             <Box key={url}>
//               <img src={url} width="200px" alt="" />
//               <Button>delete</Button>
//             </Box>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// }
