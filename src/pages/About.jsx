import Header from '../comp/Header'
import Footer from '../comp/Footer'
import MainContent from '../comp/MainContent'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";

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
      <MainContent content ={"about page"}/>
      <Footer/>
      </>)
  }
}
  
}
export default About