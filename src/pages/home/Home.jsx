import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet-async";
import { auth } from "../../firebase/config";
import {sendEmailVerification } from "firebase/auth";
import Alltasks from "./Alltasks";
import './home.css'
import { useState } from "react";
import HomeModal from "./HomeModal";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore"; 
function Home() {
  const [showmodale,setshowmodale] = useState(false)
  const [user, loading, error] = useAuthState(auth);
  const [inputvalue,setinputvalue] = useState("")
  const [taskArray,settaskarray] = useState([]);
  const [title,setTitle] =useState("");
  const openModale =()=>{
    setshowmodale(true)
  }
  const closeModel =()=>{
    setshowmodale(false)
  }
  const getinputfun = (e)=>{
    setinputvalue(e.target.value)
  }
  const pushfunc = (e)=>{
    e.preventDefault();
    taskArray.push(inputvalue);
  }
  const userId = new Date().getTime()
  const addTofirebase = async()=>{
    await setDoc(doc(db, `${user.uid}`, `${userId}`), {
      completed: false,
      title:title,
      id: userId,
      tasks: taskArray,
    });  
  }
  if (loading) {
    return (
      <>
        <h1>loading ...........</h1>
      </>
    );
  }
  if (error) {
    return (
      <>
        <h1>{error.message} ...........</h1>
      </>
    );
  }
  if(!user){
    return (
      <>
        <Helmet>
          <meta name="home" content="home" />
          <title>home  </title>
        </Helmet>
        <Header />
        <main>hello please sign in</main>
        <Footer />
      </>
    );
}
    if (user) {
      if (!user.emailVerified) {
        return (
          <>
            <Helmet>
              <meta name="home" content="home" />
              <title>home</title>
            </Helmet>
            <Header />
            <main>
              hello {user.displayName} please verify your email , we send message
              <button onClick={()=>{
                sendEmailVerification(auth.currentUser)
                .then(() => {
                  // Email verification sent!
                  // ...
                  console.log("Email verification sent")
                });
              }}>send another message</button>
            </main>
            <Footer />
          </>
        );
      }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <meta name="home" content="home" />
            <title>home</title>
          </Helmet>
          <Header />
          <main><Alltasks closeModel={closeModel} openModale = {openModale}/></main>
          <HomeModal closeModel={closeModel} showmodale={showmodale} taskArray={taskArray} setTitle={setTitle} getinputfun={getinputfun} pushfunc={pushfunc} addTofirebase={addTofirebase}/>
          <Footer />
        </>
      );
    }
  }


}

export default Home;
