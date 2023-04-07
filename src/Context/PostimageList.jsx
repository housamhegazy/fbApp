import { auth } from '../firebase/config';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
// @ts-ignore
export const listContext = createContext()
export default function ListProvider(props) {



    const [user, loading, error] = useAuthState(auth);
    //==================================
    //==================================
    //get profile photo from firebase storage
    //==================================
    //==================================
const [userid , setuserid] = useState('')
    useEffect(()=>{
        if(user){
            setuserid(user.uid)
        }else{
            return;
        }
    },[user])
    const [imageList, setimageList] = useState([]);
    const storage = getStorage();
    const listRef = ref(storage, `postImage/${userid}/`);

    useEffect(() => {
      listAll(listRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (!imageList.includes(url)) {
              setimageList((prev) => [...prev, url]);
            }
          });
        });
      });
    }, [imageList,listRef]);

  return (
    <listContext.Provider value={{imageList}}>
         {props.children}
    </listContext.Provider>
   
  )
}
