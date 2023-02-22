import React from 'react'

export default function TaskSection() {
  return (
    <>
    <ul className="list-group w-50 mt-5 mb-4">
            <li className="list-group-item d-flex justify-content-between">
              <p className='text-black'>
                  neww
              </p>
              <i className="bi bi-trash fs-3 text-danger" role="button"></i>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <p className='text-black '>
                  neww
              </p>
              <i className="bi bi-trash fs-3 text-danger cursor-pointer" role="button"></i>
            </li>
      </ul>
      <button className='btn btn-primary'>add more </button>
      </>
  )
}
