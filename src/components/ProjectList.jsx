import { List, Typography, Stack, Skeleton } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import ProjectOptionsMenu from "./ProjectOptionsMenu";
import * as React from "react";
import PropTypes from "prop-types";

//TODO: should i prefetch the projects when mousing over the project list?
export default function ProjectList({selectedProjectId, setSelectedProjectId, projects, projectsQueryIsLoading, projectsQueryIsError}) {



  if (projectsQueryIsLoading) {
    return (
      <>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ margin: "0.5rem 0" }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ margin: "0.5rem 0" }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ margin: "0.5rem 0" }}
        />
      </>
    );
  }

  if (projectsQueryIsError) {
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
  projects: PropTypes.array,
  projectsQueryIsLoading: PropTypes.bool.isRequired,
  projectsQueryIsError: PropTypes.bool,
};

// This is pulling the projects from the local dev db
// TODO: Pull the user from the auth context rather than hardcoding it
//
