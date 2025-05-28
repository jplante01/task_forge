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
      console.log('mutationFn fired', data);
      const newTask = data;
      console.log("Creating task", newTask);
      return tasksApi.createTask(newTask);
    },
    onMutate: async (data) => {
      // console.log("onMutate fired", data);
      const newTask = data;
      console.log("New task data:", newTask.project_id);
      await queryClient.cancelQueries({ queryKey: ["tasks", newTask.project_id] });

      const previousTasks = queryClient.getQueryData([
        "tasks",
        newTask.project_id,
      ]);

      queryClient.setQueryData(["tasks", newTask.project_id], (old) => {
        return [...old, newTask];
      });

      return { previousTasks };
    },
    onError: (data) => {
      const { project_id } = data;
      queryClient.setQueryData(["tasks", project_id], (old) => old);
    },
    onSettled: (data) => {
      const { project_id } = data;
      queryClient.invalidateQueries(["tasks", project_id]);
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
      console.log("Updating task", taskId, updates, projectId);
      await queryClient.cancelQueries({ queryKey: ["tasks", projectId] });

      const previousTasks = queryClient.getQueryData(["tasks", projectId]);

      // console.log("Previous tasks", previousTasks); working
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
