import { List, Typography } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import React, { useContext } from "react";
import { UIStateContext } from "../contexts/UIStateContext";

export default function ProjectList() {
  const { setSelectedProject, selectedProject, projects, getProjectsByUserIdLoading, getProjectsByUserIdError } = useContext(UIStateContext);

  return (
    <List>
      {getProjectsByUserIdLoading ? (
        <Typography>Loading...</Typography>
      ) : getProjectsByUserIdError ? (
        <Typography>Error loading projects</Typography>
      ) : (
        projects.map((project) => (
          <ProjectListItem
            key={project.id}
            project={project}
            isSelected={selectedProject === project.id}
            onClick={() => setSelectedProject(project.id)}
          />
        ))
      )}
    </List>
  );
}

// This is pulling the projects from the local dev db
// TODO: Pull the user from the auth context rather than hardcoding it
// 