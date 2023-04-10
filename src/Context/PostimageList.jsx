import { createContext } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Paper,
} from "@mui/material";

import React, { useReducer, useState } from "react";

// @ts-ignore
export const TodoListContext = createContext();
const initialData = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];
// let Taskid = new Date().getTime();
function reducerExample(state, action) {
  switch (action.type) {
    case "ADDTASK":
      return (state = [
        ...state,
        { text: action.payload, done: true, id: new Date().getTime() },
      ]);
    case "DELETETASK":
      return (state = state.filter((item) => {
        return item.id !== action.payload;
      }));
    default:
      return state;
  }
}
export default function ListProvider({ children }) {
  const [state, dispatch] = useReducer(reducerExample, initialData);
  const [inputData, setinputData] = useState("");
  function onChanges(e) {
    setinputData(e.target.value);
  }
  function addData() {
    if (inputData.length > 0) {
      // @ts-ignore
      dispatch({ type: "ADDTASK", payload: inputData });
      setinputData("");
    }
  }
  function handledelete(id) {
    // @ts-ignore
    dispatch({ type: "DELETETASK", payload: id });
  }
  return (
    <TodoListContext.Provider
      value={{
        state,
        handledelete,
        addData,
        onChanges,
        inputData,
        setinputData,
        initialData,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
}
