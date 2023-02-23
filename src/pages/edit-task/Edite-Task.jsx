import Footer from '../../comp/Footer'
import Header from '../../comp/Header'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import BtnsSection from './task-sections/BtnsSection'
import TaskSection from './task-sections/TaskSection'
import Titlesection from './task-sections/Titlesection'
import { auth } from '../../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
 function EditeTask() {
  let { userId } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()
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
  return (
    <>
    <Helmet>
      <title>edit task </title>
    </Helmet>
    <Header/>
    <main> 
      {/* input header */}
      <Titlesection userId={userId} user={user}/>
      {/* task */}
      <TaskSection userId={userId} user={user}/>
      {/* button */}
      <BtnsSection/>
    </main>
    <Footer/>
    </>
  )
 }
}
}
export default EditeTask