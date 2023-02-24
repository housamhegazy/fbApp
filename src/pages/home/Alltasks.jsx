import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from '../../firebase/config';import Moment from 'react-moment';
import { orderBy, query,where , limit } from "firebase/firestore";
import ReactLoading from 'react-loading';

export default function Alltasks({openModale,user}) {
  const AlltasksData = query(collection(db, user.uid), orderBy("id"));
  const newestData = query(collection(db, user.uid), orderBy("id", "desc"));
  const oldestData = query(collection(db, user.uid), orderBy("id"));
  const completedData = query(collection(db, user.uid), where("completed", "==", true))
  const notcompletedData = query(collection(db, user.uid), where("completed", "==", false))
  const [initailData ,setinitialdata] = useState(AlltasksData)
  const [value, loading, error] = useCollection(initailData);
  const [optvalue,setoptvalue] = useState("alltasks");
  const [showopacity,setopacity] = useState(true)

  const newestFun = ()=>{
    setinitialdata(newestData)
  }
  const oldestFun = ()=>{
    setinitialdata(oldestData)
  }


  if(loading){
    return(<ReactLoading type={"spin"} color={"red"} height={200} width={200} />)
  }
  if(error){
    return(<h1>{error.message}</h1>)
  }
  return (
    <>
      {/* btns */}
      <div className="filter-container d-flex my-5">
       {optvalue === "alltasks" && 
        <>
          <button style={{opacity:showopacity?"1":".5"}} onClick={()=>{
          newestFun()
          setopacity(false)
        }} className='btn btn-primary mx-3'>newest</button>
        <button style={{opacity:showopacity?".5":"1"}} onClick={()=>{
          oldestFun()
          setopacity(true)
        }} className='btn btn-primary mx-3'>oldest</button>
        </>
       }

        <select value={optvalue} onChange={(e)=>{
            setoptvalue(e.target.value)
             if(e.target.value == "alltasks"){
                setinitialdata(AlltasksData)
              }
              if(e.target.value == "completed"){
                setinitialdata(completedData)
              }
              if(e.target.value == "notcompleted"){
                setinitialdata(notcompletedData)
              }
          }} className='form-select mx-3'>
          <option value="alltasks">alltasks</option>
          <option value="completed">completed</option>
          <option value="notcompleted">notcompleted</option>
        </select>
      </div>
      {/* tasks */}
      {value.docs.length === 0 && <h3>congratulation , you finished all tasks</h3>}
      
      <div className="tasks container d-flex my-5 w-100">
        
      {value && value.docs.map((task)=>{
        
          return (
          <Link dir='auto'  key={task.data().id} to={`/edittask/${task.data().id}`} className="task bg-white m-2">
            <h5 className='text-center py-2'>{task.data().title}</h5>
            <ul className="list-group mx-1 px-1">
              {task.data().tasks.map((ele ,index)=>{
                if(index < 2){
                  return (<li key={ele} className="list-group-item ">{ele}</li>)
                }
              })}
            </ul> 
            <p className='time'><Moment fromNow ago>{task.data().id}</Moment></p>
          </Link>
          )
        })}
      
      </div>
      {/* btn */}
      <div className="add-task-btn">
        <button onClick={()=>{
          openModale()
        }} className='btn btn-primary mb-4'>add task</button>
      </div>
      </>)
}
