import projectsApi from "../../api/projects";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const getProjectsByUser = (user) => {
  return useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => projectsApi.getProjectsByUserId(user?.id),
    staleTime: 1000 * 5, 
  });
};

export const getProjectById = (projectId) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectsApi.getProjectById(projectId),
    enabled: !!projectId,
    staleTime: 1000 * 5,
  });
}

export const deleteProjectById = (projectId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => projectsApi.deleteProjectById(projectId),
    onMutate: async(projectId) => {
      await queryClient.cancelQueries(["projects"]);
      const previousProjects = queryClient.getQueryData(["projects"]);
      queryClient.setQueryData(["projects"], (old) => {
        return old.filter((project) => project.id !== projectId);
      });
      return { previousProjects };
    },
    onError: () => {
      queryClient.setQueryData(["projects"], (old) => {
        return old;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["projects"]);
    },

  })
}