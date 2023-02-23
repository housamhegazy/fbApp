import React from 'react'

export default function Titlesection() {
  return (
    <div className="input-header d-flex align-center w-50">
    <input type="text" className='form-control bg-transparent text-white text-center' defaultValue={"title"}/>
    <i className="bi bi-pencil-square fs-3" role="button"></i>
  </div>
  )
}
