import supabase from "../lib/supabase";
const projectsApi = {
  getProjectsByUserId: async (userId) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId);
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

  createProject: async (userId, projectData) => {
    const { data, error } = await supabase
      .from("projects")
      .insert({ ...projectData, user_id: userId })
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

export default projectsApi;