import Header from '../comp/Header'
import Footer from '../comp/Footer'
import MainContent from '../comp/MainContent'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import {  deleteUser } from "firebase/auth";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";

function Profile(){
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    if(!user && !loading){
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
  return (
    <>
      <Header/>
      <main>
      <ReactLoading type={"spin"} color={"red"} height={200} width={200} />
      </main>
      <Footer/>
    </>
  );
}
if(error){
  return(<><h1>{error.message} ...........</h1></>)
}
if(user){
  if(user.emailVerified){
    return (<>
      <Header/>
      <main dir='auto' >
        <div className='profile'>
        <h2 dir='auto'>
            {i18n.language === "en" && "account info"}
            {i18n.language === "ar" && "معلومات الحساب"}
            {i18n.language === "fr" && "informations de compte"}
        </h2>
        <p>{i18n.language === "en" && "your name :"}
            {i18n.language === "ar" && "  الاسم: "}
            {i18n.language === "fr" && "votre nom : "} 
            {user.displayName}</p>
        <p>
            {i18n.language === "en" && "account created from :"}
            {i18n.language === "ar" && " تم انشاء الحساب منذ: "}
            {i18n.language === "fr" && "compte créé depuis : "} 
           <Moment fromNow ago>{user.metadata.creationTime}</Moment></p>
        <p>
            {i18n.language === "en" && "last log in  :"}
            {i18n.language === "ar" && " اخر تسجيل دخول منذ: "}
            {i18n.language === "fr" && "Dernière connexion : "} 
          
         <Moment fromNow ago>{user.metadata.lastSignInTime}</Moment>
        </p>
        </div>
        <button onClick={()=>{
          deleteAccount()
        }} className='btn btn-danger mt-3'>
          
            {i18n.language === "en" && "delete account"}
            {i18n.language === "ar" && " حذف الحساب "}
            {i18n.language === "fr" && "Supprimer le compte"} 
        
        </button>
      </main>
    
      <Footer/>
      </>)
  }
}
}
export default Profile