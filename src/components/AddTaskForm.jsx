import { TextField, Box, Button } from "@mui/material";
import * as React from "react";
import { useCreateTask } from "../hooks/queries/tasks";
import { v4 as uuidv4 } from "uuid";
// TODO: pass the projectId prop

export default function AddTaskForm({ projectId }) {
  const [taskName, setTaskName] = React.useState("");
  const [error, setError] = React.useState(null);

  const { mutate: createTask, isPending } = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTaskName = taskName.trim();
    if (!newTaskName) {
      setError("Task name cannot be empty");
      return;
    }
    createTask({
      project_id: projectId,
      title: newTaskName,
      id: uuidv4(),
      description: "",
      completed: false,
      starred: false,
    });
    setTaskName(""); // Reset form on success
    setError(null); // Clear error on success
  };
  return (
    <Box>
      <form>
        <TextField
          label=""
          variant="outlined"
          size="small"
          value={taskName}
          fullWidth
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button
          type="submit"
          variant="text"
          color="primary"
          onClick={handleSubmit}
        >
          + Add Task
        </Button>
      </form>
    </Box>
  );
}
