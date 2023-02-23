import { useState } from "react"
import Modal from "../../shared/Modal"
export default function HomeModal({closeModel,showmodale}){
  const [inputvalue,setinputvalue] = useState("")
  const [taskArray,settaskarray] = useState([])
  const pushfunc = ()=>{
    taskArray.push(inputvalue);
    console.log(taskArray)
  }
  return (<>
    {showmodale &&<Modal closeModel={closeModel}>
          <input type="text" className="my-5" />
            <form className="d-flex-row">
              <input onChange={(e)=>{
                setinputvalue(e.target.value)
              }} type="text" className="mb-2" />
              <button onClick={(e)=>{
                e.preventDefault();
                pushfunc()
              }} className="btn btn-primary small">add</button>
            </form>

            <ul>
              <li>22</li>
              <li>55</li>
              <li>44</li>
            </ul>
          <button onClick={(e)=>{
                e.preventDefault()
              }} className="btn btn-primary">add task</button>
    </Modal>}
        </>)
}