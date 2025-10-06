import { List, Typography, Stack, Skeleton } from "@mui/material";
import ProjectListItem from "./ProjectListItem";
import ProjectOptionsMenu from "./ProjectOptionsMenu";
import type { Database } from "../types/supabase";
import type { User } from "@supabase/supabase-js";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ProjectListProps {
  selectedProjectId: string | null;
  setSelectedProjectId: (projectId: string) => void;
  projects: Project[] | undefined;
  projectsQueryIsLoading: boolean;
  projectsQueryIsError: boolean;
  user: User | null;
  handleDrawerToggle: () => void;
}

export default function ProjectList({
  selectedProjectId,
  setSelectedProjectId,
  projects,
  projectsQueryIsLoading,
  projectsQueryIsError,
  user,
  handleDrawerToggle
}: ProjectListProps) {

  if (projectsQueryIsLoading) {
    return (
      <>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ margin: "0.5rem 0" }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ margin: "0.5rem 0" }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ margin: "0.5rem 0" }}
        />
      </>
    );
  }

  if (projectsQueryIsError) {
    return (
    <Typography>Error loading projects</Typography>
    )
  }

  if (projects && projects.length === 0) {
    return (
       <Typography>No projects found</Typography>
    );
  }

  return (
    <List>
      {projects?.map((project) => (
        <Stack key={project.id} direction="row" justifyContent="space-between">
          <ProjectListItem
            project={project}
            isSelected={selectedProjectId === project.id}
            setSelectedProjectId={setSelectedProjectId}
            handleDrawerToggle={handleDrawerToggle}
          />
          <ProjectOptionsMenu
            project={project}
            user={user}
          />
        </Stack>
      ))}
    </List>
  );
}
