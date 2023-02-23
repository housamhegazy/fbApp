import React from 'react'
import { db } from '../../../firebase/config';
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
export default function Titlesection({user,userId}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));
  console.log(userId)
  if(value){
    return (
      <div className="input-header d-flex align-center w-50">
      <input type="text" className='form-control bg-transparent text-white text-center' defaultValue={value.data().title}/>
      <i className="bi bi-pencil-square fs-3" role="button"></i>
    </div>
    )
  }

}
