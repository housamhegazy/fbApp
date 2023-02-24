import React from 'react'
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Moment from "react-moment";
export default function BtnsSection({DeletTask,user, userId}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));
  if(value){
    return (
      <button onClick={(e)=>{
          DeletTask(e)
      }} className='btn btn-danger my-5'>delete Task </button>
    )
  }
  
}
