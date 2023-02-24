import React, { useState } from 'react'
import { useDocument } from "react-firebase-hooks/firestore";
 import { doc } from "firebase/firestore";
import { db } from '../../../firebase/config';
import Moment from 'react-moment';
import { async } from '@firebase/util';
export default function TaskSection({user,userId}) {
  // const [checkbox,setcheckbox] = useState(false)
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));


  if(value){
    return (
      <section className='w-50'>
      <div className="info d-flex justify-content-between mt-5 mb-4">
      <div className='time'><Moment fromNow ago>{value.data().id}</Moment></div>
        <div className="check d-flex">
          <input checked={value.data().completed}




           id='checkbox' type="checkbox" name="completed"/>
          <label htmlFor='checkbox' className='m-0'>completed</label>
        </div>
      </div>
      <ul className="list-group ">
          {value.data().tasks.map((ele)=>{
              return(
                <li dir='auto' key={ele} className="list-group-item d-flex justify-content-between">
                <p className='text-black'>
                    {ele}
                </p>
                <i className="bi bi-trash fs-3 text-danger" role="button"></i>
             </li>
              )
          })}
           
        </ul>
        <div className="add-more w-100 text-center my-2">
          <button className='btn btn-primary'>add more </button>
        </div>
        </section>
    )

  }
  
}
