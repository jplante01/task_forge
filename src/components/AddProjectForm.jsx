import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function AddProjectForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

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
    <form onSubmit={() => {}}>
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
        // disabled={createProject.isLoading || !name}
      >
        Add Project
        {/* {createProject.isLoading ? "Creating..." : "+ Add Project"} */}
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
