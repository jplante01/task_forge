import tasksApi from "../../api/projects";
import { useQuery } from "@tanstack/react-query";

export const useGetTasksByProjectId = (projectId) => {
  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => tasksApi.getTasksByProjectId(projectId),
  });
};
