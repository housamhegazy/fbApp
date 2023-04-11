import { auth } from "../firebase/config";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { Close } from "@mui/icons-material";

// @ts-ignore
export const CommentsContext = createContext()
export default function CommentsProvider({children}) {
  const [user] = useAuthState(auth);
    const [data,setData] = useState([])
//   const [value, loading, error] = useCollection(
//     collection(db, `comments${user.uid}`)
//   );
//     if(user){
//         if(value){
//             setData(value.docs)
//         }
//       }
useEffect(()=>{
    
})
  return <CommentsContext.Provider value={{data}}>
    {children}
  </CommentsContext.Provider>
}
