import Footer from "../comp/Footer"
import Header from "../comp/Header"
import './signup.css'
function Signup(){
  return (
    <>
    <Header/>
      <form>
      <div className="content">
        <input type="text" className="form-control my-2" placeholder="Username" />
        <input type="email" className="form-control my-2" placeholder="email" />
        <input type="password" className="form-control my-2" placeholder="password" />
        <button className="btn btn-primary mt-5" value={"submit"}>submit</button>
      </div>
    </form>
    <Footer/>
    </>
  
  )
}
export default Signup