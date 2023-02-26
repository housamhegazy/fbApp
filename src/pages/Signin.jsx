import Footer from "../comp/Footer"
import Header from "../comp/Header"
import './signin.css'
import { signInWithEmailAndPassword ,sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Modal from "../shared/Modal";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import ReactLoading from 'react-loading';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
function Signin(){
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [errorMsg,seterrorMsg] = useState("");
  const [modal,setmodal] = useState(false);
  const [resetEmail,setresetEmail] = useState("")
  const [resetResult,setresetResult] = useState("")
  const [loadingBtn,setloadingBtn] = useState(false)
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    if(user && !loading){
      navigate("/")
    }
  },[])
  const closeModel = ()=>{
    setmodal(false)
  }
  const openModal = ()=>{
    setmodal(true)
  }
  const Signinfun = async()=>{
  setloadingBtn(true)
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    navigate("/")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    seterrorMsg(errorCode)
  });
  setloadingBtn(false)
  }
  const resetPass = ()=>{
sendPasswordResetEmail(auth, resetEmail)
  .then(() => {
    // Password reset email sent!
    setresetResult("password sent")
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setresetResult(errorCode)
    // ..
  });
  }
  if(loading){
    return(<>
    <Header/>
    <main><ReactLoading type={"spin"} color={"red"} height={200} width={200} />
    </main>
    <Footer/>
    </>
    )
  }
  if(error){
    return(<><h1>error! ...........</h1></>)
  }
  if(!user){
    return (
      <>
      <Helmet>
      <meta
        name="signin"
        content="signin"
      />
      <title>sign in</title>
      </Helmet>
      <Header/>
      {modal && 
      <Modal closeModel={closeModel} >
          <form onSubmit={(e)=>{
            e.preventDefault()
          }} className="modalform form-control">
            <p className="fs-3 text-center">
            {i18n.language === "en" && "enter your email"}
            {i18n.language === "ar" && "أدخل بريدك الإلكتروني"}
            {i18n.language === "fr" && "entrer votre Email"}
              </p>
            <input onChange={(e)=>{
              setresetEmail(e.target.value)
            }} type="text" className="form-control"/>
            <button onClick={(e)=>{
              e.preventDefault();
              resetPass()
            }} className="btn btn-primary mt-3">{t("signin")}</button>
            <p>{resetResult}</p>
          </form>
      </Modal>}
      <form onSubmit={(e)=>{e.preventDefault()}} className="signinform">
        <div className="content">
          <p dir="auto"> 
            {i18n.language === "en" && "enter your email and password"}
            {i18n.language === "ar" && "أدخل بريدك الإلكتروني وكلمة المرور"}
            {i18n.language === "fr" && "entrez votre email et votre mot de passe"}
            </p>
          <input onChange={(e)=>{
            setemail(e.target.value)
          }} type="email" className="form-control my-2" placeholder="email" />
          <input onChange={(e)=>{
            setpassword(e.target.value)
          }} type="password" className="form-control my-2" placeholder="password" />
          <button onClick={(e)=>{
            Signinfun()
          }} className="btn btn-primary mt-5" value={"submit"}>
            {loadingBtn ? <ReactLoading type={"spin"} color={"red"} height={20} width={20} />: `${t("signin")}`}
          </button>
        </div>
        <p className="mt-3">{errorMsg}</p>
        <p className="account">
            
            {i18n.language === "en" && "Don't hava an account? "}
            {i18n.language === "ar" && "ليس لديك حساب؟ "}
            {i18n.language === "fr" && "Vous n'avez pas de compte  ? "}   
          <Link to="/signup"> {t("signup")}</Link>
          </p>
        <button onClick={()=>{
          openModal()
        }} className="btn btn-secondary"> 
        {i18n.language === "en" && "reset password"}
        {i18n.language === "ar" && "إعادة تعيين كلمة المرور"}
        {i18n.language === "fr" && "réinitialiser le mot de passe"}
        </button>
      </form>
      <Footer/>
      </>
      
    )
  }

}
export default Signin