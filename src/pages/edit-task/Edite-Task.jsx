import Footer from 'comp/Footer'
import Header from 'comp/Header'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import BtnsSection from './task-sections/BtnsSection'
import TaskSection from './task-sections/TaskSection'
import Titlesection from './task-sections/Titlesection'

export default function EditeTask() {
  return (
    <>
    <Helmet>
      <title>edit task </title>
    </Helmet>
    <Header/>
    <main> 
      {/* input header */}
      <Titlesection/>
      {/* task */}
      <TaskSection/>
      {/* button */}
      <BtnsSection/>
    </main>
    <Footer/>
    </>
  )
}
