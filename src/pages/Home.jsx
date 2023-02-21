import Header from '../comp/Header'
import Footer from '../comp/Footer'
import MainContent from '../comp/MainContent'
function Home(){
  return (<>
  <Header/>
  <MainContent content ={"home page"}/>
  <Footer/>
  </>)
}
export default Home