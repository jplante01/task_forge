import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useCreateProject } from "../hooks/queries/projects";

export default function AddProjectForm({ user }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  // TODO: call the hook and destructure the mutate function
  const { mutate: createProject } = useCreateProject();
  // TODO: create a handleSubmit function that calls the mutate function

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProjectName = name.trim();
    createProject({ userId: user.id, projectData: { name: newProjectName, id: crypto.randomUUID(), description: "" } });
    setName(""); // Reset form on success
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   try {
  //     await createProject.mutateAsync({ name });
  //     setName(""); // Reset form on success
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  return (
    <form>
      <TextField
        label="Project name"
        variant="outlined"
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        // disabled={createProject.isLoading}
      />
      <Button
        type="submit"
        variant="text"
        color="primary"
        onClick={handleSubmit}
        // disabled={createProject.isLoading || !name}
      >
        Add Project
        {/* {createProject.isLoading ? "Creating..." : "+ Add Project"} */}
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
