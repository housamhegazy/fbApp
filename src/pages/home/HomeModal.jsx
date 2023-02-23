import { useState } from "react"
import Modal from "../../shared/Modal";
 
export default function HomeModal({ closeModel,inputvalue,setTitlefun,title, showmodale, taskArray, setTitle, getinputfun, pushfunc,addTofirebase }) {
  return (<>
    {showmodale && <Modal closeModel={closeModel}>
      <input onChange={(e) => {
        setTitlefun(e)
      }} type="text" className="my-5" required value={title}/>
      <div className="d-flex-row">
        <input onChange={(e) => {
          getinputfun(e)
        }} type="text" className="mb-2" required value={inputvalue}/>
        <button onClick={(e) => {
          pushfunc(e)
        }} className="btn btn-primary small">add</button>
      </div>
      <ul>
        {taskArray.map((ele) => 
           <li key={ele}>{ele}</li>
        )}
      </ul>
      <button onClick={(e) => {
        e.preventDefault();
        addTofirebase()
      }} className="btn btn-primary" type="submit">add task</button>
    </Modal>}
  </>)
}