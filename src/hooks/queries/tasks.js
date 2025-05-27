import tasksApi from "../../api/tasks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetTasksByProjectId = (projectId, options = {}) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => tasksApi.getTasksByProjectId(projectId),
    ...options,
  });
};

export const useDeleteTaskById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { taskId, projectId } = data;
      return tasksApi.deleteTask(taskId, projectId);
    },
    onMutate: async (data) => {
      const { taskId, projectId } = data;

      await queryClient.cancelQueries({ queryKey: ["tasks", projectId] });

      const previousTasks = queryClient.getQueryData(["tasks", projectId]);

      queryClient.setQueryData(["tasks", projectId], (old) => {
        return old.filter((task) => task.id !== taskId);
      });

      return { previousTasks };
    },
    onError: () => {
      queryClient.setQueryData(["tasks"], (old) => old);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { projectId, taskData } = data;
      return tasksApi.createTask(projectId, taskData);
    },
    onMutate: async (data) => {
      const { projectId, taskData } = data;

      await queryClient.cancelQueries({ queryKey: ["tasks", projectId] });

      const previousTasks = queryClient.getQueryData(["tasks", projectId]);

      queryClient.setQueryData(["tasks", projectId], (old) => {
        return [...old, taskData];
      });

      return { previousTasks };
    },
    onError: () => {
      queryClient.setQueryData(["tasks"], (old) => old);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

export const useUpdateTaskById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { taskId, updates } = data;
      return tasksApi.updateTask(taskId, updates);
    },
    onMutate: async (data) => {
      const { taskId, updates, projectId } = data;
      await queryClient.cancelQueries({ queryKey: ["tasks", projectId] });

      const previousTasks = queryClient.getQueryData(["tasks", projectId]);

      queryClient.setQueryData(["tasks", projectId], (old) => {
        return old.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task,
        );
      });

      return { previousTasks };
    },
    onError: (data) => {
      const { projectId } = data;
      queryClient.setQueryData(["tasks", projectId], (old) => old);
    },
    onSettled: (data) => {
      const { projectId } = data;
      queryClient.invalidateQueries(["tasks", projectId]);
    },
  });
};
