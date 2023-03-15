import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { storage } from "../firebase/config";
import { ref ,uploadBytes,listAll} from "firebase/storage";
import {v4} from'uuid'
export default function Articles() {
    const [imageUpload,setimageUpload] = useState(null)
    const [imageList,setImageList] = useState([])

  const uploadImage = () => {
    if(imageUpload === null){return ;}
    const ImageRef = ref(storage,`images/${imageUpload.name + v4() }`); //'images' is path to store images
    uploadBytes(ImageRef,imageUpload).then(()=>{
        alert('image uploaded')
    })
  };

useEffect(()=>{

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
      {/* <img src={imageUpload} alt="" /> */}
    </Box>
  );
}
