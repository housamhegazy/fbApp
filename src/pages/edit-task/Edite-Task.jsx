import "./editTask.css";
import Footer from "../../comp/Footer";
import Header from "../../comp/Header";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BtnsSection from "./task-sections/BtnsSection";
import TaskSection from "./task-sections/TaskSection";
import Titlesection from "./task-sections/Titlesection";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateDoc, deleteDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/config";
import { async } from "@firebase/util";
function EditeTask() {
  let { userId } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showData, setshowData] = useState(true);
  const [addtasksample, setaddtasksample] = useState(false);
  const [inputvalue,setinutvalue]= useState("")

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });
  //titlesection
  const changeTitle = async (e) => {
    await updateDoc(doc(db, user.uid, userId), {
      title: e.target.value,
    });
  };
  // subtasksectio
  const checkboxFun = async (e) => {
    if (e.target.checked) {
      await updateDoc(doc(db, user.uid, userId), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, userId), {
        completed: false,
      });
    }
  };
  const trashFun = async (ele) => {
    await updateDoc(doc(db, user.uid, userId), {
      tasks: arrayRemove(ele),
    });
  };
  const addnewTaskFun = () => {
    setaddtasksample(true);
  };
  const cancelAddTaskSampleFun = () => {
    setaddtasksample(false);
  };
  const getinputvalue = (e)=>{
    setinutvalue(e.target.value)
  }
  const sendnewTaskTofireBaseFun = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, user.uid, userId), {
      tasks: arrayUnion(inputvalue),
    });
    setinutvalue("")
  };
  // btn section
  const DeletTask = async (e) => {
    e.preventDefault();
    setshowData(false);
    await deleteDoc(doc(db, user.uid, userId));
    navigate("/", { replace: true });
  };
  if (error) {
    return (
      <>
        <Helmet>
          <title>error Page</title>
        </Helmet>
        <Header />
        <h1>error : {error.message}</h1>
        <Footer />
      </>
    );
  }

  if (loading) {
    return <h1>loading ..............</h1>;
  }

  if (user) {
    if (user.emailVerified) {
      if (showData) {
        return (
          <>
            <Helmet>
              <title>edit task </title>
            </Helmet>
            <Header />
            <main>
              {/* input header */}
              <Titlesection
                userId={userId}
                user={user}
                changeTitle={changeTitle}
              />
              {/* task */}
              <TaskSection
                userId={userId}
                user={user}
                checkboxFun={checkboxFun}
                trashFun={trashFun}
                addnewTaskFun={addnewTaskFun}
                addtasksample={addtasksample}
                cancelAddTaskSampleFun={cancelAddTaskSampleFun}
                sendnewTaskTofireBaseFun = {sendnewTaskTofireBaseFun}
                getinputvalue={getinputvalue}
                inputvalue={inputvalue}
              />
              {/* button */}
              <BtnsSection DeletTask={DeletTask} />
            </main>
            <Footer />
          </>
        );
      }
    }
  }
}
export default EditeTask;
