import { auth } from "../firebase/config";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// @ts-ignore
export const ProfileImageContext = createContext();

export function ProfileImageProvider({ children }) {
  const [user] = useAuthState(auth);
  const storage = getStorage();
  const [myURL , setUrl] = useState(null)
  useEffect(() => {
    if (user) {
       getDownloadURL(ref(storage, `UsersProfileImage/${user.uid}/profimage`))
        .then((url) => {
            setUrl(url);
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              console.log("File doesnt exist");
              break;
            case "storage/unauthorized":
              console.log(" User doesnt have permission to access the object");
              break;
            case "storage/canceled":
              console.log(" storage/canceled");
              break;
            case "storage/unknown":
              console.log(
                " Unknown error occurred, inspect the server response"
              );
              break;
            default:
              console.log(" downloaded succesfully");
          }
        });
    }
  }, [myURL,setUrl,user,storage]);

  

  return (
    <ProfileImageContext.Provider value={{ myURL,setUrl }}>
      {children}
    </ProfileImageContext.Provider>
  );
}
