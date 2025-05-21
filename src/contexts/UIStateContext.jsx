import { createContext } from "react";
import * as React from "react";
import PropTypes from "prop-types";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import projectsApi from "../api/projects";
// import { tasksApi } from "../api/tasks";

export const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
  // const [selectedProjectId, setSelectedProjectId] = useState(null);
  // const user = { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" }; // You might want to move this to a proper auth context


  // Set initial selected project
  // useEffect(() => {
  //   if (projects.length && !selectedProjectId) {
  //     setSelectedProjectId(projects[0].id);
  //   }
  // }, [projects, selectedProjectId]);

  // // Project Mutations
  // const createProject = useMutation({
  //   mutationFn: (projectData) =>
  //     projectsApi.createProject(user.id, projectData),
  //   onSuccess: () => queryClient.invalidateQueries(["projects", user?.id]),
  // });
  // const updateProject = useMutation({
  //   mutationFn: projectsApi.updateProject,
  //   onSuccess: () => queryClient.invalidateQueries(["projects", user?.id]),
  // });
  // const deleteProject = useMutation({
  //   mutationFn: projectsApi.deleteProject,
  //   onSuccess: () => queryClient.invalidateQueries(["projects", user?.id]),
  // });

  // // Tasks Query (for selected project)
  // const tasksQuery = useQuery({
  //   queryKey: ["tasks", selectedProjectId],
  //   queryFn: () =>
  //     selectedProjectId ? tasksApi.getTasksByProjectId(selectedProjectId) : [],
  //   enabled: !!selectedProjectId,
  // });
  // const tasks = tasksQuery.data || [];

  // // Task Mutations
  // const createTask = useMutation({
  //   mutationFn: tasksApi.createTask,
  //   onSuccess: () => {
  //     if (selectedProjectId) {
  //       queryClient.invalidateQueries(["tasks", selectedProjectId]);
  //     }
  //   },
  // });
  // const updateTask = useMutation({
  //   mutationFn: tasksApi.updateTask,
  //   onSuccess: () => {
  //     if (selectedProjectId) {
  //           queryClient.invalidateQueries(["tasks", selectedProjectId]);
  //     }
  //   },
  // });
  // const toggleTaskComplete = useMutation({
  //   mutationFn: tasksApi.toggleTaskComplete,
  //   onSuccess: () => {
  //     if (selectedProjectId) {
  //       queryClient.invalidateQueries(["tasks", selectedProjectId]);
  //     }
  //   },
  // });
  // const toggleTaskStarred = useMutation({
  //   mutationFn: tasksApi.toggleTaskStarred,
  //   onSuccess: () => {
  //     if (selectedProjectId) {
  //       queryClient.invalidateQueries(["tasks", selectedProjectId]);
  //     }
  //   },
  // });
  // const deleteTask = useMutation({
  //   mutationFn: tasksApi.deleteTask,
  //   onSuccess: () => {
  //     if (selectedProjectId) {
  //       queryClient.invalidateQueries(["tasks", selectedProjectId]);
  //     }
  //   },
  // });

  return (
    <UIStateContext.Provider
      value={{
        // Project state and methods
        // selectedProjectId,
        // setSelectedProjectId,
        // createProject,
        // updateProject,
        // deleteProject,
        // // Task state and methods
        // tasks,
        // tasksQuery, // includes loading/error states
        // createTask,
        // updateTask,
        // toggleTaskComplete,
        // toggleTaskStarred,
        // deleteTask,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

UIStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
