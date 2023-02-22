import Footer from "../comp/Footer"
import Header from "../comp/Header"
import './signin.css'
import { signInWithEmailAndPassword ,sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Modal from "../shared/Modal";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
function Signin(){
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [errorMsg,seterrorMsg] = useState("");
  const [modal,setmodal] = useState(false);
  const [resetEmail,setresetEmail] = useState("")
  const [resetResult,setresetResult] = useState("")
  useEffect(()=>{
    if(user && !loading){
      navigate("/")
    }
  },[])
  const closeModel = ()=>{
    setmodal(false)
  }
  const openModal = ()=>{
    setmodal(true)
  }
  const Signinfun = ()=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    navigate("/")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    seterrorMsg(errorCode)
  });
  }
  const resetPass = ()=>{
sendPasswordResetEmail(auth, resetEmail)
  .then(() => {
    // Password reset email sent!
    setresetResult("password sent")
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setresetResult(errorCode)
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
        name="signin"
        content="signin"
      />
      <title>sign in</title>
      </Helmet>
      <Header/>
      {modal && 
      <Modal closeModel={closeModel} >
          <form onSubmit={(e)=>{
            e.preventDefault()
          }} className="modalform">
            <p>enter your email</p>
            <input onChange={(e)=>{
              setresetEmail(e.target.value)
            }} type="text" />
            <button onClick={()=>{
              resetPass()
            }}>submit</button>
            <p>{resetResult}</p>
          </form>
      </Modal>}
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <div className="content">
          <p>enter your email and password</p>
          <input onChange={(e)=>{
            setemail(e.target.value)
          }} type="email" className="form-control my-2" placeholder="email" />
          <input onChange={(e)=>{
            setpassword(e.target.value)
          }} type="password" className="form-control my-2" placeholder="password" />
          <button onClick={(e)=>{
            Signinfun()
          }} className="btn btn-primary mt-5" value={"submit"}>submit</button>
        </div>
        <p className="mt-3">{errorMsg}</p>
        <button onClick={()=>{
          openModal()
        }} className="btn btn-secondary">reset password</button>
      </form>
      <Footer/>
      </>
      
    )
  }

}
export default Signin