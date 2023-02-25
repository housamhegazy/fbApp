import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../context/Theme";
import './header.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/config";
import {signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const SignoutFun = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Sign-out successful")
      navigate("/signin")
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <nav className="navbar navbar-expand-lg bg-info">
    <div className="container-fluid ">
      <Link className="navbar-brand" to={"/"}>H.HEGAZY</Link>
      <div className="btns">
          <button className="language btn btn-primary btn-sm mx-3">{t("lang")}
            <ul dir="auto" className="opt-langs">
              <li dir="auto" className="d-flex justify-content-start" onClick={()=>{
                    i18n.changeLanguage("en");
                  }}>
                  <p className="m-0">english</p>
                  {i18n.language == "en" && <i className="bi bi-check"></i>}
              </li>
              <li dir="auto" className="d-flex justify-content-start" onClick={()=>{
                    i18n.changeLanguage("ar");
                  }}>
                  
                  {i18n.language == "ar" && <i className="bi bi-check"></i>}
                  <p className="m-0">العربيه</p>
              </li>
              <li dir="auto" className="d-flex justify-content-start" onClick={()=>{
                    i18n.changeLanguage("fr");
                  }}>
                  <p className="m-0">france</p>
                  {i18n.language == "fr" && <i className="bi bi-check"></i>}
              </li>
            </ul>
          </button>
          <div className="theme-togg mx-3">
            <i onClick={()=>{
              toggleTheme(theme === "light" ? "dark" : "light")
              localStorage.setItem("mtTheme",theme === "dark"? "light":"dark")
            }} className="bi bi-moon-fill"></i>
            <i onClick={()=>{
              toggleTheme(theme === "light" ? "dark" : "light")
              localStorage.setItem("mtTheme",theme === "dark"? "light":"dark")
            }} className="bi bi-brightness-high-fill"></i>
          </div>
          {!user && 
            <>
            <Link to={"/signin"} className="btn btn-primary btn-sm mx-2">{t("signin")}</Link>
            <Link to={"/signup"} className="btn btn-primary btn-sm mx-2">{t("signup")}</Link>
            </>
          }
          {user && 
          <>
          <button onClick={()=>{
            SignoutFun()
          }} className="btn btn-danger btn-sm mx-3">{t("signout")}</button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          </>
          }
      </div>

      {user && <>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={"/about"}>{t("support")}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to={"/profile"}>{t("profile")}</Link>
        </li>
      </ul>
    </div>
      </>
      }
    </div>
  </nav>
  );
};

export default Header;