import { Link } from 'react-router-dom'
import './ErrorPage.css'
export default function ErrorPage(){
    return (
      <div className='error'>
      <div>
        <div className="number">404</div>
        <div className="text"><span>Ooops...</span><br />page not found</div>
        <Link className="me" to="/" >home</Link>
      </div>
    </div>
    )
}