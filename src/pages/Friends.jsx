// test context

import React from "react";
import { useContext } from "react";
import { listContext } from "context/PostimageList";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
export default function Friends() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()

  // console.log(imageList)
  useEffect(()=>{
    if(!user &&!loading){
      navigate("/")
    }
  })
  const {imageList} = useContext(listContext)
  return (
    <div> {imageList.map((item)=>{
      return(
        <img key={item} src={item} alt="listimages"/> 
      )
    })}
    <button onClick={()=>{
         
        }}>click</button>
    </div>
  );
}
