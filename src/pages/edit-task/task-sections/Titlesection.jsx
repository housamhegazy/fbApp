import React, { useEffect } from 'react'
import { db } from '../../../firebase/config';
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

export default function Titlesection({user,userId,changeTitle}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));

  if (error) {
    return (
      <section>
        <h1>{error.message}</h1>
      </section>
    );
  }
  if (loading) {
    return <h1 className="center">loading...</h1>;
  }

  if(value){
    return (
      <div className="input-header d-flex align-center w-50">
      <input onChange={(e)=>{
        changeTitle(e)
      }} dir='auto' type="text" className='form-control bg-transparent text-white text-center' defaultValue={value.data().title}/>
      <i className="bi bi-pencil-square fs-3" role="button"></i>
    </div>
    )
  }

}
