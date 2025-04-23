import { useQuery } from "@tanstack/react-query";
import { List, Typography } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import React, { useContext } from "react";
import { UIStateContext } from "../contexts/UIStateContext";
import projectsApi from "../api/projects";

export default function ProjectList() {
  const user = { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" };
  const { setSelectedProject, selectedProject } = useContext(UIStateContext);
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => projectsApi.getProjectsByUserId(user?.id),
  });
  return (
    <List>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : isError ? (
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