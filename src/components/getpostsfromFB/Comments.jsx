
import { auth, db } from "../../firebase/config";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import GetCommentsFromdb from "./GetCommentsFromdb";



export default function Comments({id}) {
  const [user, loading, error] = useAuthState(auth);
  const [commentInput, setcommentInput] = useState('');
  const idforComment = new Date().getTime();

//send comments to firebase db
  const sendDatatoFireBase = async () => {
    if(commentInput.trim().length > 0 ){
      await setDoc(doc(db, `comments${user.uid}`, `${idforComment}`), {
        name: user.displayName,
        post: commentInput,
        commentid: id,
      });
      setcommentInput('')
    }
      
  };

  const deletecomment = async(itemid)=>{
    await deleteDoc(doc(db, `comments${user.uid}`, itemid));
  }
 
  return (
    <GetCommentsFromdb {...{user,commentInput,setcommentInput,sendDatatoFireBase,id,deletecomment}}/>
  );
}
