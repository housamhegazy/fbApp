import Header from "../comp/Header";
import Footer from "../comp/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet-async";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {sendEmailVerification } from "firebase/auth";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) {
    return (
      <>
        <h1>loading ...........</h1>
      </>
    );
  }
  if (error) {
    return (
      <>
        <h1>{error.message} ...........</h1>
      </>
    );
  }
    if (user) {
      if (!user.emailVerified) {
        return (
          <>
            <Helmet>
              <meta name="home" content="home" />
              <title>home</title>
            </Helmet>
            <Header />
            <main>
              hello {user.displayName} please verify your email , we send message
              <button onClick={()=>{
                sendEmailVerification(auth.currentUser)
                .then(() => {
                  // Email verification sent!
                  // ...
                  console.log("Email verification sent")
                });
              }}>send another message</button>
            </main>
            <Footer />
          </>
        );
      }
    
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <meta name="home" content="home" />
            <title>home</title>
          </Helmet>
          <Header />
          <main>hello : {user.displayName}</main>
          <Footer />
        </>
      );
    }
  }
  if(!user){
    return (
      <>
        <Helmet>
          <meta name="home" content="home" />
          <title>home  </title>
        </Helmet>
        <Header />
        <main>hello please sign in</main>
        <Footer />
      </>
    );
}

}

export default Home;
