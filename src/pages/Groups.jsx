import React from "react";
import { app, auth, db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  query,
} from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
export default function Groups() {
  const [user] = useAuthState(auth);
  const [data, setdata] = useState({ email: "", password: "" });
  //get data from fileRef
  const [value, loading, error] = useCollection(
    query(collection(db, user.uid))
  );

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
      id: id,
      email: data.email,
      password: data.password,
    }).then(() => console.log("data send ok2"));
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
      {/* get data from firestore */}
      <Box>
        {value &&
          value.docs.map((item) => {
            return (
              <div key={item.id}>
                <Typography>{item.data().email}</Typography>
                <Typography>{item.data().password}</Typography>
                <Typography>{item.data().id}</Typography>
              </div>
            );
          })}
      </Box>
    </Stack>
  );
}
