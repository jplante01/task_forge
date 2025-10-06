import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useCreateProject } from "../hooks/queries/projects";
import { v4 as uuidv4 } from "uuid";
import type { User } from "@supabase/supabase-js";

interface AddProjectFormProps {
  user: User;
}

export default function AddProjectForm({ user }: AddProjectFormProps) {
  const [name, setName] = useState("");
  const { mutate: createProject, isPending } = useCreateProject();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newProjectName = name.trim();
    createProject({
      userId: user.id,
      projectData: { name: newProjectName, id: uuidv4(), description: "" },
    });
    setName(""); // Reset form on success
  };

  return (
    <form>
      <TextField
        label="Project name"
        variant="outlined"
        size="small"
        fullWidth
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        disabled={isPending}
      />
      <Button
        type="submit"
        variant="text"
        color="primary"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? "Creating..." : "+ Add Project"}
      </Button>
    </form>
  );
}
