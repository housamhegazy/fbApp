import Footer from "../comp/Footer"
import Header from "../comp/Header"
import './signup.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
function Signup(){
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
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
              console.log(errorCode)
              // ..
            });
        }} className="btn btn-primary mt-5" value={"submit"}>submit</button>
      </div>
    </form>
    <Footer/>
    </>
  
  )
}
export default Signup