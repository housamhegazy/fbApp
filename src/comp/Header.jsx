import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../context/Theme";
import './header.css'
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="navbar navbar-expand-lg bg-info">
    <div className="container-fluid ">
      <Link className="navbar-brand" to={"/"}>H.HEGAZY</Link>
      <div className="btns">
          <button onClick={()=>{
            toggleTheme(theme === "light" ? "dark" : "light")
            localStorage.setItem("mtTheme",theme === "dark"? "light":"dark")
          }} className="btn btn-primary btn-sm">dark mood</button>
          <Link to={"/signin"} className="btn btn-primary btn-sm">sign in</Link>
          <Link to={"/signup"} className="btn btn-primary btn-sm">sign up</Link>
          <button className="btn btn-danger btn-sm">sign out</button>
      </div>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
    
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={"/about"}>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to={"/profile"}>Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default Header;