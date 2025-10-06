import supabase from "../lib/supabase";
import type { Database } from "../types/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

const projectsApi = {
  getProjectsByUserId: async (userId: string): Promise<Project[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId);
    if (error) throw error;
    return data;
  },

  getProjectById: async (id: string): Promise<Project> => {
    const { data, error} = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  createProject: async (
    userId: string,
    projectData: Omit<ProjectInsert, "user_id">
  ): Promise<Project> => {
    const { data, error } = await supabase
      .from("projects")
      .insert({ ...projectData, user_id: userId })
      .select();

    if (error) throw error;
    return data[0];
  },

  updateProject: async (updates: ProjectUpdate & { id: string }): Promise<Project> => {
    const { id, ...rest } = updates;
    const { data, error } = await supabase
      .from("projects")
      .update(rest)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  deleteProject: async (id: string): Promise<boolean> => {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};

export default projectsApi;
