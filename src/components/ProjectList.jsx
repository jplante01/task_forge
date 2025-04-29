import { List, Typography, Stack } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import React, { useContext } from "react";
import { UIStateContext } from "../contexts/UIStateContext";
import ProjectOptionsMenu from "./ProjectOptionsMenu";
export default function ProjectList() {
  const { setSelectedProjectId, selectedProjectId, projects, projectsQuery, deleteProject } = useContext(UIStateContext);

  return (
    <List>
      {projectsQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : projectsQuery.isError ? (
        <Typography>Error loading projects</Typography>
      ) : (
        projects.map((project) => (
          <Stack key={project.id} direction="row" justifyContent="space-between">
            <ProjectListItem
              project={project}
              isSelected={selectedProjectId === project.id}
              onClick={() => setSelectedProjectId(project.id)}
            />
            <ProjectOptionsMenu project={project} onDeleteProject={deleteProject.mutate} />
          </Stack>
        ))
      )}
    </List>
  );
}

// This is pulling the projects from the local dev db
// TODO: Pull the user from the auth context rather than hardcoding it
// 