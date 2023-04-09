import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Paper,
} from "@mui/material";

import React, { useReducer, useState } from "react";
const initialData = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];
let nextId = 3;
function reducerExample(state, action) {
  switch (action.type) {
    case "ADDTASK":
      return (state.initialData = [
        ...state.initialData,
        { text: action.payload, done: true, id: nextId++ },
      ]);
    case "DELETETASK":
      return (state.initialData = state.initialData.filter((item) => {
        return item.id !== action.payload;
      }));
    default:
      return state;
  }
}
export default function Settings() {
  const [state, dispatch] = useReducer(reducerExample, initialData);
  const [inputData, setinputData] = useState("");
  function onChanges(e) {
    setinputData(e.target.value);
  }
  function addData() {
    if (inputData.length > 0) {
      dispatch({ type: "ADDTASK", payload: inputData });
      setinputData("");
    }
  }
  function handledelete(id) {
    dispatch({ type: "DELETETASK", payload: id });
  }
  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center", pt: 3 }}>
      <Typography variant="h3" sx={{ py: 2 }}>
        {" "}
        Todo List
      </Typography>
      <Box component="form" sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          onChange={(e) => {
            onChanges(e);
          }}
          type="text"
          value={inputData}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addData();
          }}
        >
          add
        </Button>
      </Box>
      <Box>
        {state.initialDatate.map((t) => {
          return (
            <Paper
              key={t.id}
              sx={{
                display: "flex",
                p: 2,
                my: 2,
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              <Typography>{t.text}</Typography>
              <Button
                color="error"
                onClick={() => {
                  handledelete(t.id);
                }}
              >
                delete
              </Button>
            </Paper>
          );
        })}
      </Box>
    </Stack>
  );
}
