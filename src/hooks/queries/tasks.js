import tasksApi from "../../api/tasks";
import { useQuery } from "@tanstack/react-query";

export const useGetTasksByProjectId = (projectId, options = {}) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => tasksApi.getTasksByProjectId(projectId),
    ...options,
  });
};
