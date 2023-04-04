import React from "react";
import { app, auth, db } from "../firebase/config";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Divider, Stack } from "@mui/material";
export default function Groups() {
  const [user, loading, error] = useAuthState(auth);
  const [data, setdata] = useState({ email: "", password: "" });


  
  const id = new Date().getTime();

  //send data to database by setDoc
  const sendData = async () => {
    await setDoc(doc(db, user.uid, `${id}`), {
      id: id,
      email: data.email,
      password: data.password,
    }).then((resp) => console.log("data sent"));
  };
  //send data to database by addDoc
  // الفرق ان هنا بيعمل اي دي عشوائي

  const AdddocFunc = async () => {
    // Add a new document with a generated id.
    await addDoc(collection(db, user.uid), {
      email: data.email,
      password: data.password,
    });
  };

  //get data from firestore by getData ()
  const getdata = async () => {
  await getDocs( collection(db, user.uid))
      .then((response) => {console.log(response.docs.map((item) => {return item.data()}))})
      .catch((err) => err.message);
   
  };
 

  return (
    <Stack>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}
      >
        <input
          onChange={(e) => {
            setdata({ ...data, email: e.target.value });
          }}
          type="email"
          name=""
        />
        <input
          onChange={(e) => {
            setdata({ ...data, password: e.target.value });
          }}
          type="password"
          name=""
        />
        <button type="submit">submit</button>
      </form>
      <Divider />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          AdddocFunc();
        }}
      >
        <input
          onChange={(e) => {
            setdata({ ...data, email: e.target.value });
          }}
          type="email"
          name=""
        />
        <input
          onChange={(e) => {
            setdata({ ...data, password: e.target.value });
          }}
          type="password"
          name=""
        />
        <button type="submit">submit</button>
      </form>
      <button onClick={()=>{
         getdata()
      }}>click</button>
    
    </Stack>
  );
}
