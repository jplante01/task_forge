import { createContext, useState, useEffect } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import projectsApi from "../api/projects";

export const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const user = { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" }; // You might want to move this to a proper auth context

  const {
    data: projects = [],
    isLoading: getProjectsByUserIdLoading,
    error: getProjectsByUserIdError,
  } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => projectsApi.getProjectsByUserId(user?.id),
  });

  useEffect(() => {
    if (projects?.length && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  return (
    <UIStateContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        projects,
        getProjectsByUserIdLoading,
        getProjectsByUserIdError,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

UIStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
