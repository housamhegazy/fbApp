// import { FirstContext } from 'Context/PostimageList'
// import React, { useContext } from 'react'

// export default function Friends() {
//   const {housam,count,increaseNumber,decreaseNumber} = useContext(FirstContext)
//   return (
//     <div>
//     <button onClick={() => increaseNumber()}>
//       {" "}
//       increament
//     </button>
//     <button onClick={() => decreaseNumber()}>
//       {" "}
//       decreament
//     </button>
//     <h1>{count}</h1>
//     <h1>{housam}</h1>
//     </div>
//   )
// }
import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import { Action } from "@remix-run/router";

import React, { useState } from "react";
const initialData = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];
let nextId = 3;
export default function Friends() {
  const [data, setData] = useState(initialData);
  const [inputData, setinputData] = useState("");
  function onChanges(e) {
    setinputData(e.target.value);
  }
  function addData() {
    if (inputData.length > 0) {
      setData([...data, { text: inputData, done: true, id: nextId++ }]);
      setinputData("");
    }
  }
  function handledelete(id) {
    setData(
      data.filter((item) => {
        return item.id !== id;
      })
    );
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
        {data.map((t) => {
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
