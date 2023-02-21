import Footer from "../comp/Footer"
import Header from "../comp/Header"
import './signin.css'
function Signin(){
  return (
    <>
    <Header/>
      <form>
      <div className="content">
        <p>enter your email and password</p>
        <input type="email" className="form-control my-2" placeholder="email" />
        <input type="password" className="form-control my-2" placeholder="password" />
        <button className="btn btn-primary mt-5" value={"submit"}>submit</button>
      </div>
    </form>
    <Footer/>
    </>
  
  )
}
export default Signin