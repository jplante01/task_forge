import projectsApi from "../../api/projects";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import type { Database } from "../../types/supabase";
import { useNotification } from "../../contexts/NotificationContext";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

interface DeleteProjectData {
  projectId: string;
  userId: string;
}

interface CreateProjectData {
  userId: string;
  projectData: Omit<ProjectInsert, "user_id">;
}

export const getProjectsByUser = (user: User | null) => {
  return useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("User ID is required");
      return projectsApi.getProjectsByUserId(user.id);
    },
    enabled: !!user?.id,
    staleTime: 1000 * 5,
  });
};

export const getProjectById = (projectId: string | null) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => {
      if (!projectId) throw new Error("Project ID is required");
      return projectsApi.getProjectById(projectId);
    },
    enabled: !!projectId,
    staleTime: 1000 * 5,
  });
};

export const useDeleteProjectById = () => {
  const queryClient = useQueryClient();
  const { showError } = useNotification();

  return useMutation({
    mutationFn: (data: DeleteProjectData) => {
      const { projectId } = data;
      return projectsApi.deleteProject(projectId);
    },
    onMutate: async (data: DeleteProjectData) => {
      const { projectId, userId } = data;

      await queryClient.cancelQueries({ queryKey: ["projects", userId] });

      const previousProjects = queryClient.getQueryData<Project[]>([
        "projects",
        userId,
      ]);

      queryClient.setQueryData<Project[]>(["projects", userId], (old) => {
        return old ? old.filter((project) => project.id !== projectId) : [];
      });

      return { previousProjects };
    },
    onError: (_error, variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(
          ["projects", variables.userId],
          context.previousProjects
        );
      }
      showError("Failed to delete project. Please try again.");
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects", variables.userId] });
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { showError } = useNotification();

  return useMutation({
    mutationFn: (data: CreateProjectData) => {
      const { userId, projectData } = data;
      return projectsApi.createProject(userId, projectData);
    },
    onMutate: async (data: CreateProjectData) => {
      const { userId } = data;

      await queryClient.cancelQueries({ queryKey: ["projects", userId] });

      const previousProjects = queryClient.getQueryData<Project[]>([
        "projects",
        userId,
      ]);

      // Don't add optimistic update for create - wait for server response with ID
      return { previousProjects };
    },
    onError: (_error, variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(
          ["projects", variables.userId],
          context.previousProjects
        );
      }
      showError("Failed to create project. Please try again.");
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects", variables.userId] });
    },
  });
};
