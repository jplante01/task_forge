import { TextField } from "@mui/material";
import * as React from "react";
export default function AddTaskForm() {
  return (
    <TextField
      label="Add Task"
      variant="outlined"
      size="small"
      sx={{ width: "200px" }}
    />
  );
}
