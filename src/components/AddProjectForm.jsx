import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useCreateProject } from "../hooks/queries/projects";

export default function AddProjectForm({ user }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  // TODO: call the hook and destructure the mutate function
  const { mutate: createProject, isPending } = useCreateProject();
  // TODO: create a handleSubmit function that calls the mutate function

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProjectName = name.trim();
    createProject({ userId: user.id, projectData: { name: newProjectName, id: crypto.randomUUID(), description: "" } });
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
        onChange={(e) => setName(e.target.value)}
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
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
