import React from 'react'

export default function BtnsSection({DeletTask}) {
  return (
    <button onClick={(e)=>{
        DeletTask(e)
    }} className='btn btn-danger my-5'>delete Task </button>
  )
}
