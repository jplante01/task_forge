import { useQuery } from "@tanstack/react-query";
import { projects as projectsData } from "../data/seedData";
import { List, Typography } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import React, { useContext } from "react";
import { UIStateContext } from "../contexts/UIStateContext";

export default function ProjectList() {
  const { setSelectedProject, selectedProject } = useContext(UIStateContext);
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      new Promise((resolve) =>
        setTimeout(() => resolve([...projectsData]), 1000),
      ),
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
