import { createContext, useState, useEffect } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import projectsApi from "../api/projects";
import { tasksApi } from "../api/tasks";

export const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const user = { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" }; // You might want to move this to a proper auth context
  const queryClient = useQueryClient();

  // Projects Query
  const projectsQuery = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => projectsApi.getProjectsByUserId(user?.id),
  });

  const projects = projectsQuery.data || [];

  // Set initial selected project
  useEffect(() => {
    if (projects.length && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  // Project Mutations
  const createProject = useMutation({
    mutationFn: projectsApi.createProject,
    onSuccess: () => queryClient.invalidateQueries(["projects", user?.id]),
  });
  const updateProject = useMutation({
    mutationFn: projectsApi.updateProject,
    onSuccess: () => queryClient.invalidateQueries(["projects", user?.id]),
  });
  const deleteProject = useMutation({
    mutationFn: projectsApi.deleteProject,
    onSuccess: () => queryClient.invalidateQueries(["projects", user?.id]),
  });

  // Tasks Query (for selected project)
  const tasksQuery = useQuery({
    queryKey: ["tasks", selectedProject],
    queryFn: () =>
      selectedProject ? tasksApi.getTasksByProjectId(selectedProject) : [],
    enabled: !!selectedProject,
  });

  // Task Mutations
  const createTask = useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: () => {
      if (selectedProject) {
        queryClient.invalidateQueries(["tasks", selectedProject]);
      }
    },
  });
  const updateTask = useMutation({
    mutationFn: tasksApi.updateTask,
    onSuccess: () => {
      if (selectedProject) {
        queryClient.invalidateQueries(["tasks", selectedProject]);
      }
    },
  });
  const toggleTaskComplete = useMutation({
    mutationFn: tasksApi.toggleTaskComplete,
    onSuccess: () => {
      if (selectedProject) {
        queryClient.invalidateQueries(["tasks", selectedProject]);
      }
    },
  });
  const toggleTaskStarred = useMutation({
    mutationFn: tasksApi.toggleTaskStarred,
    onSuccess: () => {
      if (selectedProject) {
        queryClient.invalidateQueries(["tasks", selectedProject]);
      }
    },
  });
  const deleteTask = useMutation({
    mutationFn: tasksApi.deleteTask,
    onSuccess: () => {
      if (selectedProject) {
        queryClient.invalidateQueries(["tasks", selectedProject]);
      }
    },
  });

  return (
    <UIStateContext.Provider
      value={{
        // Project state and methods
        selectedProject,
        setSelectedProject,
        projects,
        projectsQuery, // includes loading/error states
        createProject,
        updateProject,
        deleteProject,
        // Task state and methods
        tasks: tasksQuery.data || [],
        tasksQuery, // includes loading/error states
        createTask,
        updateTask,
        toggleTaskComplete,
        toggleTaskStarred,
        deleteTask,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

UIStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
