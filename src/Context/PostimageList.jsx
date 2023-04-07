import { createContext, useState } from "react";
export const postImageListProvider = createContext("");
export function PostimageList(children) {
  const [myName, setmyName] = useState('housam ali');
  return (
    <postImageListProvider.Provider value={myName}>
      {children}
    </postImageListProvider.Provider>
  );
}
