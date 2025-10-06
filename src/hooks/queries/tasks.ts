import tasksApi from "../../api/tasks";
import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import type { Database } from "../../types/supabase";

type Task = Database["public"]["Tables"]["tasks"]["Row"];
type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"];
type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"];

interface DeleteTaskData {
  taskId: string;
  projectId: string;
}

interface UpdateTaskData {
  taskId: string;
  updates: TaskUpdate;
  projectId: string;
}

export const useGetTasksByProjectId = (
  projectId: string | null,
  options: Omit<UseQueryOptions<Task[]>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => {
      if (!projectId) throw new Error("Project ID is required");
      return tasksApi.getTasksByProjectId(projectId);
    },
    enabled: !!projectId,
    ...options,
  });
};

export const useDeleteTaskById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteTaskData) => {
      const { taskId } = data;
      return tasksApi.deleteTask(taskId);
    },
    onMutate: async (data: DeleteTaskData) => {
      const { taskId, projectId } = data;

      await queryClient.cancelQueries({ queryKey: ["tasks", projectId] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks", projectId]);

      queryClient.setQueryData<Task[]>(["tasks", projectId], (old) => {
        return old ? old.filter((task) => task.id !== taskId) : [];
      });

      return { previousTasks, projectId };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTasks && context.projectId) {
        queryClient.setQueryData(["tasks", context.projectId], context.previousTasks);
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.projectId] });
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask: TaskInsert) => {
      return tasksApi.createTask(newTask);
    },
    onMutate: async (newTask: TaskInsert) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", newTask.project_id] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        "tasks",
        newTask.project_id,
      ]);

      // Don't add optimistic update for create - wait for server response with ID
      return { previousTasks, projectId: newTask.project_id };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTasks && context.projectId) {
        queryClient.setQueryData(["tasks", context.projectId], context.previousTasks);
      }
    },
    onSettled: (data) => {
      if (data?.project_id) {
        queryClient.invalidateQueries({ queryKey: ["tasks", data.project_id] });
      }
    },
  });
};

export const useUpdateTaskById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTaskData) => {
      const { taskId, updates } = data;
      return tasksApi.updateTask(taskId, updates);
    },
    onMutate: async (data: UpdateTaskData) => {
      const { taskId, updates, projectId } = data;
      await queryClient.cancelQueries({ queryKey: ["tasks", projectId] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks", projectId]);

      queryClient.setQueryData<Task[]>(["tasks", projectId], (old) => {
        return old
          ? old.map((task) =>
              task.id === taskId ? { ...task, ...updates } : task
            )
          : [];
      });

      return { previousTasks, projectId };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTasks && context.projectId) {
        queryClient.setQueryData(["tasks", context.projectId], context.previousTasks);
      }
    },
    onSettled: (data) => {
      if (data?.project_id) {
        queryClient.invalidateQueries({ queryKey: ["tasks", data.project_id] });
      }
    },
  });
};
