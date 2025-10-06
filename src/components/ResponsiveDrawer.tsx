import { Drawer, Stack, Typography, Box, Button } from "@mui/material";
import AddProjectForm from "./AddProjectForm";
import ProjectList from "./ProjectList";
import { useThemeModeContext } from "../contexts/ThemeModeContext";
import { TaskForgeLogo } from "../logo/TaskForgeLogo";
import { Logout } from "@mui/icons-material";
import type { User } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ResponsiveDrawerProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
  handleDrawerToggle: () => void;
  setSelectedProjectId: (id: string | null) => void;
  selectedProjectId: string | null;
  projects: Project[] | undefined;
  projectsQueryIsLoading: boolean;
  projectsQueryIsError: boolean;
  user: User | null;
  signOut: () => Promise<void>;
}

export default function ResponsiveDrawer({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  handleDrawerToggle,
  setSelectedProjectId,
  selectedProjectId,
  projects,
  projectsQueryIsLoading,
  projectsQueryIsError,
  user,
  signOut,
}: ResponsiveDrawerProps) {
  const { theme } = useThemeModeContext();

  const drawer = (
    <Stack margin="1rem" sx={{ height: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ padding: "1rem", marginBottom: "2rem" }}
      >
        <Box
          sx={{
            width: "80px",
            height: "80px",
            marginRight: "0.5rem",
          }}
        >
          <TaskForgeLogo
            sx={{
              width: "100%",
              height: "100%",
              color: theme.palette.text.primary,
            }}
          />
        </Box>
        <Typography variant="logoFont">TASKFORGE</Typography>
      </Stack>
      {user && (
        <Box sx={{ marginBottom: "2rem" }}>
          <AddProjectForm user={user} />
        </Box>
      )}
      <ProjectList
        setSelectedProjectId={setSelectedProjectId}
        selectedProjectId={selectedProjectId}
        projects={projects}
        projectsQueryIsLoading={projectsQueryIsLoading}
        projectsQueryIsError={projectsQueryIsError}
        user={user}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Stack
        sx={{ height: "100%" }}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            variant="outlined"
            endIcon={<Logout />}
            onClick={() => {
              signOut();
            }}
            sx={{
              color: "text.secondary",
              borderColor: "text.secondary",
            }}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
