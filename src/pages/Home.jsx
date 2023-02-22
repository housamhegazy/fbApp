import Header from '../comp/Header'
import Footer from '../comp/Footer'
import MainContent from '../comp/MainContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet-async';
import { auth } from '../firebase/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Home(){
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()
  useEffect(()=>{
      if(!user){
        navigate("/signin")
      }
      
  },[])
  if(loading){
    return(<><h1>loading ...........</h1></>)
  }
  if(error){
    return(<><h1>error! ...........</h1></>)
  }
  if(!user.emailVerified){
    return (<>
      <Helmet>
      <meta
          name="home"
          content="home"
        />
        <title>home</title>
        
      </Helmet>
      <Header/>
        <MainContent content ={"verify email"}/>
        <Footer/>
        </>)
  }
  if(user){
    if(user.emailVerified){
      return (<>
        <Helmet>
        <meta
            name="home"
            content="home"
          />
          <title>home</title>
        </Helmet>
        <Header/>
        <MainContent content ={"home page"}/>
        <Footer/>
        </>)
    }
  }

}
export default Home