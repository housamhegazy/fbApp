import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { storage } from "../firebase/config";
import { ref ,uploadBytes,listAll,getDownloadURL} from "firebase/storage";
import {v4} from'uuid'
export default function Articles() {
    //store image from button onchange
    const [imageUpload,setimageUpload] = useState(null)
    //store image from firebase
    const [imageList,setImageList] = useState([])
    const imageListRef = ref(storage,'images/')

    //send images to firebase
  const uploadImage = () => {
    if(imageUpload === null){return ;}
    const ImageRef = ref(storage,`images/${imageUpload.name + v4() }`); //'images' is path to store images
    uploadBytes(ImageRef,imageUpload).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
            setImageList((prev)=>[...prev,url])
        })
    })
  };

  //get images from firebase and store it in imageslist state
useEffect(()=>{
    listAll(imageListRef).then((response)=>{
        response.items.forEach((item)=>{
            getDownloadURL(item).then((url)=>{
                setImageList((prev)=>[...prev,url])
            })
        })
    })
},[])


  return (
    <Box>
      <input type="file" onChange={(eo)=>{
        setimageUpload(eo.target.files[0])
      }}/>
      <Button
        onClick={() => {
          uploadImage();
        }}
      >
        upload image
      </Button>
      {/* map image list */}
      {imageList.map((url)=>{
        return (
            <img src={url} alt="" />
        )
      })}
    </Box>
  );
}
