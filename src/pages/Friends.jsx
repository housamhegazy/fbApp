// test context

import React from "react";
import { useContext } from "react";
import { postImageListProvider } from "Context/PostimageList";
export default function Friends() {
  const myList = useContext(postImageListProvider)
  return (
    <div>{myList}</div>

  );
}
