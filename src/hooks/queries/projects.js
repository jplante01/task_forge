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

export const useDeleteProjectById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { projectId, userId } = data;

      return projectsApi.deleteProject(projectId, userId);
    },
    onMutate: async (data) => {
      const { projectId, userId } = data;

      await queryClient.cancelQueries({ queryKey: ["projects", userId]});

      const previousProjects = queryClient.getQueryData(["projects", userId]);

      queryClient.setQueryData(["projects", userId], (old) => {
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
  });
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { userId, projectData } = data;

      return projectsApi.createProject(userId, projectData);
    },
    onMutate: async (data) => {
      const { userId, projectData } = data;

      await queryClient.cancelQueries({ queryKey: ["projects", userId] });

      const previousProjects = queryClient.getQueryData(["projects", userId]);

      queryClient.setQueryData(["projects", userId], (old) => {
        return [...old, projectData];
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
  });
};