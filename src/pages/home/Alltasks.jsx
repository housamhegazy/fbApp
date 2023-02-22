import React from 'react'
import { Link } from 'react-router-dom'
export default function Alltasks() {
  return (
    <>
      {/* btns */}
      <div className="filter-container d-flex my-5">
        <button className='btn btn-primary mx-3'>newest</button>
        <button className='btn btn-primary mx-3'>oldest</button>
        <select className='form-select mx-3'>
          <option value="alltasks">alltasks</option>
          <option value="completed">completed</option>
          <option value="notcompleted">notcompleted</option>
        </select>
      </div>
      {/* tasks */}
      <div className="tasks container d-flex my-5 w-100">
        <Link to={"/edittask"} className="task bg-white m-2">
          <h2 className='text-center'>task</h2>
          <ul className="list-group">
            <li className="list-group-item">An item</li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
          </ul>
        </Link>
        <Link to={"/edittask"} className="task bg-white m-2">
          <h2 className='text-center'>task</h2>
          <ul className="list-group">
            <li className="list-group-item">An item</li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
          </ul>
        </Link>
        <Link to={"/edittask"} className="task bg-white m-2">
          <h2 className='text-center'>task</h2>
          <ul className="list-group">
            <li className="list-group-item">An item</li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
          </ul>
        </Link>
      </div>
      {/* btn */}
      <div className="add-task-btn">
        <button className='btn btn-primary mb-4'>add task</button>
      </div>
    </>
  )
}
