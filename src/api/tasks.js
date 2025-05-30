import supabase from "../lib/supabase";
export const tasksApi = {
  getTasksByProjectId: async (projectId) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  createTask: async (taskData) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert(taskData) // what shape is supabase expecting? 
      .select();

    if (error) throw error;
    return data[0];
  },

  updateTask: async (id, updates) => {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  toggleTaskComplete: async ({ id, completed }) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  toggleTaskStarred: async ({ id, starred }) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ starred: !starred })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  deleteTask: async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};

export default tasksApi;
