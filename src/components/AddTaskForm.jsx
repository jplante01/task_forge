import { TextField, Box, Button } from "@mui/material";
import * as React from "react";

export default function AddTaskForm() {
  return (
    <Box>
      <TextField label="" variant="outlined" size="small" fullWidth />
      <Button type="submit" variant="text" color="primary">
        + Add Task
      </Button>
    </Box>
  );
}
