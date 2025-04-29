import React, { useContext, useState } from "react";
import { UIStateContext } from "../contexts/UIStateContext";
import { TextField, Box, Button } from "@mui/material";

export default function AddProjectForm() {
  const { createProject } = useContext(UIStateContext);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createProject.mutateAsync({ name });
      setName(""); // Reset form on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Project name"
        variant="outlined"
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={createProject.isLoading}
      />
      <Button
        type="submit"
        variant="text"
        color="primary"
        disabled={createProject.isLoading || !name}
      >
        {createProject.isLoading ? "Creating..." : "+ Add Project"}
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
