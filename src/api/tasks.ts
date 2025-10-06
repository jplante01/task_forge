import supabase from "../lib/supabase";
import type { Database } from "../types/supabase";

type Task = Database["public"]["Tables"]["tasks"]["Row"];
type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"];
type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"];

export const tasksApi = {
  getTasksByProjectId: async (projectId: string): Promise<Task[]> => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  createTask: async (taskData: TaskInsert): Promise<Task> => {
    const { data, error } = await supabase
      .from("tasks")
      .insert(taskData)
      .select();

    if (error) throw error;
    return data[0];
  },

  updateTask: async (id: string, updates: TaskUpdate): Promise<Task> => {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  toggleTaskComplete: async ({ id, completed }: { id: string; completed: boolean }): Promise<Task> => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  toggleTaskStarred: async ({ id, starred }: { id: string; starred: boolean }): Promise<Task> => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ starred: !starred })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  deleteTask: async (id: string): Promise<boolean> => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};

export default tasksApi;
