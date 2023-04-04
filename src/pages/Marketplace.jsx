import React from "react";
import { Box, Button } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
export default function Marketplace() {
  //get image from input
  const [image, setimages] = useState(null);
  const storage = getStorage();
  //get images from database
  const [imageList, setImageList] = useState([]);
  // imagesListRef to download list
  const listRef = ref(storage, "imagesList/");
  //upload image function
  const sendimagesList = () => {
    if(image === null){
        return;
    }
    //image ref to upload image
    // هنا بنشئ اسم للثوره عند رفعها
    const imageRef = ref(storage, `imagesList/${image.name} + v4()`);
    // @ts-ignore
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        //download the last image uploaded
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      })
      .then(() => console.log("uploaded"));
  };

  //download list function
  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if(!imageList.includes(url)){
                setImageList((prev) => [...prev, url]);
            }
            
          });
        });
      })
  }, []); 
   
  console.log(imageList);

// const deleteFunc = ()=>{
//     // Delete the file
// deleteObject(imageRef).then(() => {
//     // File deleted successfully
//   }).catch((error) => {
//     // Uh-oh, an error occurred!
//   });
  
// }
//   sgssaasa
  return (
    <div>
      <form>
        <input
          onChange={(e) => {

            setimages(e.target.files[0]);
          }}
          type="file"
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
      <Box>
      {imageList.map((image) => {
        return (
            <div>
          <img
            key={image}
            alt="profile"
            src={`${image}`}
            width="200px"
            height={"200px"}
            style={{ borderRadius: "50%" }}
          />
          <button onClick={()=>{
            // deleteFunc()
          }}>delete</button>
          </div>
        );
      })}

      </Box>
    </div>
  );
}
