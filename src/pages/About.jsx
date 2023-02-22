import Header from '../comp/Header'
import Footer from '../comp/Footer'
import MainContent from '../comp/MainContent'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function About(){
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
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
      <MainContent content ={"about page"}/>
      <Footer/>
      </>)
  }
}
  
}
export default About