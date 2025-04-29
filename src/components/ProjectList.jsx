import { List, Typography } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import React, { useContext } from "react";
import { UIStateContext } from "../contexts/UIStateContext";

export default function ProjectList() {
  const { setSelectedProject, selectedProject, projects, projectsQuery } = useContext(UIStateContext);

  return (
    <List>
      {projectsQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : projectsQuery.isError ? (
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