import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import { useContext } from "react";
import { TodoListContext } from "context/PostimageList";

export default function Settings() {
 
  const {state,handledelete,addData,onChanges,inputData} = useContext(TodoListContext)
  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center", pt: 3 }}>
      <Typography variant="h5" sx={{ py: 2 }}>
        {" "}
        useReducer Todo List
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
        {state.map((t) => {
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
