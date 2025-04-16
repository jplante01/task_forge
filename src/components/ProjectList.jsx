import { useQuery } from "@tanstack/react-query";
import { projects as projectsData } from "../data/seedData";
import { List, Typography } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import React from "react";

export default function ProjectList() {
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
        <ProjectListItem key={project.id} project={project} />
      ))
    )}
  </List>;
  );
}
