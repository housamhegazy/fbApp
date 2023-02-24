import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet-async";
import { auth } from "../../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import Alltasks from "./Alltasks";
import "./home.css";
import { useState } from "react";
import HomeModal from "./HomeModal";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import SnackBar from "../../shared/SnackBar";
import MyClock from "../../comp/clock";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [showmodale, setshowmodale] = useState(false);
  const [taskArray, settaskarray] = useState([]);
  const [inputvalue, setinputvalue] = useState("");
  const [title, setTitle] = useState("");
  const [showLoading,setshowLoading] = useState(false)
  const [showSnackbar, setshowSnackbar] = useState(false)
  const openModale = () => {
    setshowmodale(true);
  };
  const closeModel = () => {
    setshowmodale(false);
    settaskarray([]);
    setTitle("");
  };

  const setTitlefun = (e) => {
    setTitle(e.target.value);
  };
  const getinputfun = (e) => {
    setinputvalue(e.target.value);
  };
  const pushfunc = (e) => {
    e.preventDefault();
    if (!taskArray.includes(inputvalue)) {
      taskArray.push(inputvalue);
      setinputvalue("");
    }
  };
  const userId = new Date().getTime();
  const addTofirebase = async () => {
    setshowLoading(true)
    
    await setDoc(doc(db, `${user.uid}`, `${userId}`), {
      completed: false,
      title: title,
      id: userId,
      tasks: taskArray,
    });
    closeModel();
    setshowLoading(false)
    setshowSnackbar(true)
    setInterval(() => {
      setshowSnackbar(false)
    }, 4000);
  };

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
  if (!user) {
    return (
      <>
        <Helmet>
          <meta name="home" content="home" />
          <title>home </title>
        </Helmet>
        <Header />
        <main>hello please sign in</main>
        <Footer />
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
            <button
              onClick={() => {
                sendEmailVerification(auth.currentUser).then(() => {
                  // Email verification sent!
                  // ...
                  console.log("Email verification sent");
                });
              }}
            >
              send another message
            </button>
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
          
          <main>
            <MyClock/>
            <Alltasks
              closeModel={closeModel}
              openModale={openModale}
              user={user}
            />
          </main>
          <HomeModal
            closeModel={closeModel}
            showmodale={showmodale}
            taskArray={taskArray}
            setTitle={setTitle}
            getinputfun={getinputfun}
            pushfunc={pushfunc}
            addTofirebase={addTofirebase}
            inputvalue={inputvalue}
            title={title}
            setTitlefun={setTitlefun}
            showLoading={showLoading}
          />
          <SnackBar showMsg ={showSnackbar}/>
          <Footer />
        </>
      );
    }
  }
}

export default Home;
