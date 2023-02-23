import Footer from "../comp/Footer"
import Header from "../comp/Header"
import './signup.css'
import { createUserWithEmailAndPassword,updateProfile,sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuthState } from 'react-firebase-hooks/auth';

function Signup(){
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [userName,setUserName] = useState("")
  const [errorMsg,seterrorMsg] = useState("");
useEffect(()=>{
  if(user && !loading){
    navigate("/")
  }
},[])
  const Signupfun = ()=>{
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        updateProfile(auth.currentUser, {
          displayName: userName
        }).then(() => {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email verification sent!
            // ...
            console.log("Email verification sent")
          });
          navigate("/")
        }).catch((error) => {
          // An error occurred
          // ...
        });
        const user = userCredential.user;
        console.log(user)
        // ...

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMsg(errorCode)
        // ..
      });
  }
  if(loading){
    return(<><h1>loading ...........</h1></>)
  }
  if(error){
    return(<><h1>error! ...........</h1></>)
  }
  if(!user){
    return (
      <>
      <Helmet>
      <meta
        name="signup"
        content="sifnup"
      />
      <title>sign up</title>
      </Helmet>
      <Header/>
        <form onSubmit={(e)=>{e.preventDefault()}} className="signupform">
        <div className="content">
          <input onChange={(e)=>{
            setUserName(e.target.value)
          }} type="text" className="form-control my-2" placeholder="Username" />
          <input onChange={(e)=>{
            setemail(e.target.value)
          }} type="email" className="form-control my-2" placeholder="email" />
          <input onChange={(e)=>{
            setpassword(e.target.value)
          }} type="password" className="form-control my-2" placeholder="password" />
          <button onClick={(e)=>{
            Signupfun()
          }} className="btn btn-primary mt-3" value={"submit"}>submit</button>
        </div>
        <p className="mt-3">{errorMsg}</p>
      </form>
      <Footer/>
      </>
    
    )
  }
  
}
export default Signup