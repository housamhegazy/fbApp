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
          <HomeModal closeModel={closeModel} showmodale={showmodale} taskArray={taskArray} setTitle={setTitle} getinputfun={getinputfun} pushfunc={pushfunc}/>
          <Footer />
        </>
      );
    }
  }


}

export default Home;
