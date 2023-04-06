import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProfileImage,sendProfileImage } from '../Redux/counterSlice'

import { getStorage, ref } from 'firebase/storage'
export default function Friends() {

// @ts-ignore
const {profileImage,profileUrl} = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  const storage = getStorage();
  const imageRef = ref(storage, `profile/profimage.jpg`);
 if(profileImage !==null){
    console.log(profileImage)
 }
  return (
    <div>
      <img src={profileUrl} alt='hh'/>
      <input onChange={(e)=>{
        dispatch(setProfileImage(e.target.files[0]))
      }} type='file'/>
      <button onClick={()=>{
        dispatch(sendProfileImage(imageRef))
      }}>send</button>
    </div>
  )
}
