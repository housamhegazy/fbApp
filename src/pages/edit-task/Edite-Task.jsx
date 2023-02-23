import Footer from '../../comp/Footer'
import Header from '../../comp/Header'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import BtnsSection from './task-sections/BtnsSection'
import TaskSection from './task-sections/TaskSection'
import Titlesection from './task-sections/Titlesection'
import { auth } from '../../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
export default function EditeTask() {
  const [user, loading, error] = useAuthState(auth);
  let { userId } = useParams();
  return (
    <>
    <Helmet>
      <title>edit task </title>
    </Helmet>
    <Header/>
    <main> 
      {/* input header */}
      <Titlesection userId={userId} user={user.uid}/>
      {/* task */}
      <TaskSection/>
      {/* button */}
      <BtnsSection/>
    </main>
    <Footer/>
    </>
  )
}
