import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from '../../firebase/config';import Moment from 'react-moment';
import { orderBy, query, limit } from "firebase/firestore";
export default function Alltasks({openModale,user}) {
  const [value, loading, error] = useCollection(collection(db,user.uid ));

  const newestFun = ()=>{
    query(collection(db, user.uid), orderBy("id"))
  }
  const oldestFun = ()=>{
    query(collection(db, user.uid), orderBy("id", "desc"))
  }
  if(loading){
    return(<h1>loading..........</h1>)
  }
  if(error){
    return(<h1>{error.message}</h1>)
  }
  return (
    <>
      {/* btns */}
      <div className="filter-container d-flex my-5">
        <button onClick={()=>{
          newestFun()
        }} className='btn btn-primary mx-3'>newest</button>
        <button onClick={()=>{
          oldestFun()
        }} className='btn btn-primary mx-3'>oldest</button>
        
        <select className='form-select mx-3'>
          <option value="alltasks">alltasks</option>
          <option value="completed">completed</option>
          <option value="notcompleted">notcompleted</option>
        </select>
      </div>
      {/* tasks */}
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
