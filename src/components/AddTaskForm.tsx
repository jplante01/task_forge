import { TextField, Box, Button } from "@mui/material";
import * as React from "react";
import { useCreateTask } from "../hooks/queries/tasks";
import { v4 as uuidv4 } from "uuid";
import type { TablesInsert } from "../types/supabase";

interface AddTaskFormProps {
  projectId: string;
}

export default function AddTaskForm({ projectId }: AddTaskFormProps) {
  const [taskName, setTaskName] = React.useState("");
  const [_error, setError] = React.useState<string | null>(null);

  const { mutate: createTask } = useCreateTask();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTaskName = taskName.trim();
    if (!newTaskName) {
      setError("Task name cannot be empty");
      return;
    }

    const newTask: TablesInsert<"tasks"> = {
      project_id: projectId,
      title: newTaskName,
      id: uuidv4(),
      description: "",
      completed: false,
      starred: false,
    };

    createTask(newTask);
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
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
