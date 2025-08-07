import { Box, CssBaseline } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import NavBar from "../components/NavBar";
import * as React from "react";
import TaskList from "../components/TaskList";
const drawerWidth = 340;
import { getProjectsByUser } from "../hooks/queries/projects";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import AnonUserDialog from "../components/AnonUserDialog";

export default function TasksMain() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [showAnonDialog, setShowAnonDialog] = React.useState(false);

  const { user, signOut } = useAuth();

  useEffect(() => {
    // Check if user just signed in anonymously
    if (user?.is_anonymous === true) {
      setShowAnonDialog(true);
    }
  }, [user]);

  const {
    data: projects,
    isLoading: projectsQueryIsLoading,
    isError: projectsQueryIsError,
  } = getProjectsByUser(user);

  useEffect(() => {
    if (projects?.length > 0 && selectedProjectId === null) {
      setSelectedProjectId(projects[0].id);
    }
    if (selectedProjectId) {
      const foundProject = projects?.find(
        (project) => project.id === selectedProjectId,
      );
      if (foundProject) {
        setSelectedProject(foundProject);
      } else {
        // If selected project is not found, select the first project if available
        if (projects?.length > 0) {
          setSelectedProjectId(projects[0].id);
          setSelectedProject(projects[0]);
        } else {
          // If no projects are available, clear the selection
          setSelectedProjectId(null);
          setSelectedProject(null);
        }
      }
    }
  }, [projects, selectedProjectId]);

  // const handleProjectSelect = (projectId) => {
  //   setSelectedProjectId(projectId);
  // };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleAnonDialogClose = () => {
    setShowAnonDialog(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        selectedProject={selectedProject}
      />
      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
          ml: { sm: `${drawerWidth}px` },
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          mt: 10,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "80%" }, p: 3 }}>
          <TaskList projectId={selectedProjectId} />
        </Box>
      </Box>
      <ResponsiveDrawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        setSelectedProjectId={setSelectedProjectId}
        selectedProjectId={selectedProjectId}
        projects={projects}
        projectsQueryIsLoading={projectsQueryIsLoading}
        projectsQueryIsError={projectsQueryIsError}
        user={user}
        signOut={signOut}
      />
      <AnonUserDialog
        showAnonDialog={showAnonDialog}
        handleAnonDialogClose={handleAnonDialogClose}
      />
    </Box>
  );
}
