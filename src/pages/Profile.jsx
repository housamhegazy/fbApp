import Header from '../comp/Header'
import Footer from '../comp/Footer'
import MainContent from '../comp/MainContent'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import {  deleteUser } from "firebase/auth";

function Profile(){
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
      navigate("/")
    }
    if(user){
      if(!user.emailVerified){
        navigate("/")
      }
    }
},[])
const deleteAccount =()=>{
  deleteUser(user).then(() => {
    navigate("/")
  }).catch((error) => {
    console.log(error.message)
  });
}
if(loading){
  return(<><h1>loading ...........</h1></>)
}
if(error){
  return(<><h1>{error.message} ...........</h1></>)
}
if(user){
  if(user.emailVerified){
    return (<>
      <Header/>
      <main >
        <div className='profile'>
        <h2>account info</h2>
        <p>your name {user.displayName}</p>
        <p>account created from : <Moment fromNow ago>{user.metadata.creationTime}</Moment></p>
        <p>last log in : <Moment fromNow ago>{user.metadata.lastSignInTime}</Moment></p>
        </div>
        <button onClick={()=>{
          deleteAccount()
        }} className='btn btn-danger mt-3'>delete account</button>
      </main>
    
      <Footer/>
      </>)
  }
}
}
export default Profile