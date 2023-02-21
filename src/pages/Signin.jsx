import Footer from "../comp/Footer"
import Header from "../comp/Header"
import './signin.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
function Signin(){
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [errorMsg,seterrorMsg] = useState("")
  const Signin = ()=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMsg(errorCode)
  });
  }
  return (
    <>
    <Header/>
    <form>
      <div className="content">
        <p>enter your email and password</p>
        <input onChange={(e)=>{
          setemail(e.target.value)
        }} type="email" className="form-control my-2" placeholder="email" />
        <input onChange={(e)=>{
          setpassword(e.target.value)
        }} type="password" className="form-control my-2" placeholder="password" />
        <button onClick={()=>{
          Signin()
        }} className="btn btn-primary mt-5" value={"submit"}>submit</button>
      </div>
      <p className="mt-3">{errorMsg}</p>
    </form>
    <Footer/>
    </>
  
  )
}
export default Signin