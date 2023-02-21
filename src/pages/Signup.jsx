import Footer from "../comp/Footer"
import Header from "../comp/Header"
import './signup.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
function Signup(){
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [errorMsg,seterrorMsg] = useState("")
  const Signup = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
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
  return (
    <>
    <Header/>
      <form>
      <div className="content">
        <input type="text" className="form-control my-2" placeholder="Username" />
        <input onChange={(e)=>{
          setemail(e.target.value)
        }} type="email" className="form-control my-2" placeholder="email" />
        <input onChange={(e)=>{
          setpassword(e.target.value)
        }} type="password" className="form-control my-2" placeholder="password" />
        <button onClick={(e)=>{
          Signup()
        }} className="btn btn-primary mt-3" value={"submit"}>submit</button>
      </div>
    </form>
    <p>{errorMsg}</p>
    <Footer/>
    </>
  
  )
}
export default Signup