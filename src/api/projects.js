import supabase from "../lib/supabase";
export const projectsApi = {
  getProjects: async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getProjectById: async (id) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  createProject: async (projectData) => {
    const { data, error } = await supabase
      .from("projects")
      .insert(projectData)
      .select();

    if (error) throw error;
    return data[0];
  },

  updateProject: async ({ id, ...updates }) => {
    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  deleteProject: async (id) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};
