import './editTask.css';
import Footer from '../../comp/Footer'
import Header from '../../comp/Header'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import BtnsSection from './task-sections/BtnsSection'
import TaskSection from './task-sections/TaskSection'
import Titlesection from './task-sections/Titlesection'
import { auth } from '../../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { updateDoc,deleteDoc } from 'firebase/firestore';
import { useDocument } from "react-firebase-hooks/firestore";
 import { doc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { async } from '@firebase/util';
 function EditeTask() {
  let { userId } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showData,setshowData] =useState(true)

  useEffect(()=>{
    if(!user && !loading){
      navigate("/")
    }
    if(user){
      if(!user.emailVerified){
        navigate("/")
      }
    }
  })
//titlesection
const changeTitle = async(e)=>{
  await updateDoc(doc(db, user.uid, userId), {
    title: e.target.value,
  });
}
// subtasksectio
const changeBoxFun = async(e)=>{
  if(e.target.checked){
    await updateDoc(doc(db, user.uid, userId), {
      completed: true,
    });
  }else{
    await updateDoc(doc(db, user.uid, userId), {
      completed: false,
    });
  }
}
// btn section 
const DeletTask =async(e)=>{
  e.preventDefault();
  setshowData(false)
  await deleteDoc(doc(db, user.uid, userId));
  navigate("/", { replace: true })
}
  if (error) {
    return (
      <>
        <Helmet>
          <title>error Page</title>
        </Helmet>
        <Header />
        <h1>error : {error.message}</h1>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (<h1>loading ..............</h1>);
  }

  if(user){
    if(user.emailVerified){
      if (showData) {
        return (
          <>
          <Helmet>
            <title>edit task </title>
          </Helmet>
          <Header/>
          <main> 
            {/* input header */}
            <Titlesection userId={userId} user={user} changeTitle={changeTitle}/>
            {/* task */}
            <TaskSection userId={userId} user={user} changeBoxFun={changeBoxFun}/>
            {/* button */}
            <BtnsSection DeletTask = {DeletTask}/>
          </main>
          <Footer/>
          </>
        )
      }
     
    }

}

}
export default EditeTask