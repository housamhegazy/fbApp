import { useState } from "react"
import Modal from "../../shared/Modal"
export default function HomeModal({ closeModel, showmodale, taskArray, setTitle, getinputfun, pushfunc }) {

  return (<>
    {showmodale && <Modal closeModel={closeModel}>
      <input onChange={(e) => {
        setTitle(e.target.value)
      }} type="text" className="my-5" />
      <div className="d-flex-row">
        <input onChange={(e) => {
          getinputfun(e)
        }} type="text" className="mb-2" />
        <button onClick={(e) => {
          pushfunc(e)
        }} className="btn btn-primary small">add</button>
      </div>
      <ul>
        {
        taskArray.map((ele) => {
          return (<li key={ele}>{ele}</li>)
        })
        }
      </ul>
      <button onClick={(e) => {
        e.preventDefault()
      }} className="btn btn-primary">add task</button>
    </Modal>}
  </>)
}