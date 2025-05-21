import projectsApi from "../../api/projects";
import { useQuery } from "@tanstack/react-query";

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