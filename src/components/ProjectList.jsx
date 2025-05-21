import { List, Typography, Stack } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import ProjectOptionsMenu from "./ProjectOptionsMenu";
import { getProjectsByUser } from "../hooks/queries/projects";
import * as React from "react";
import PropTypes from "prop-types";

export default function ProjectList({selectedProjectId, setSelectedProjectId}) {

  const {
    data: projects,
    isLoading,
    isError,
  } = getProjectsByUser({ id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" });

  if (isLoading) {
    return (
      <Typography>Loading projects...</Typography>
    );
  }

  if (isError){
    return (
    <Typography>Error loading projects</Typography>
    )
  }
  {
   if (projects && projects.length === 0)
    return (
       <Typography>No projects found</Typography>
    );
  }

  return (
    <List>   
      {projects.map((project) => (
        <Stack key={project.id} direction="row" justifyContent="space-between">
          <ProjectListItem
            project={project}
            isSelected={selectedProjectId === project.id}
            onClick={() => setSelectedProjectId(project.id)}
          />
          <ProjectOptionsMenu
            project={project}
            // onDeleteProject={deleteProject.mutate}
          />
        </Stack>
      ))}
    </List>
  );
}

ProjectList.propTypes = {
  selectedProjectId: PropTypes.string,
  setSelectedProjectId: PropTypes.func.isRequired,
};

// This is pulling the projects from the local dev db
// TODO: Pull the user from the auth context rather than hardcoding it
//
