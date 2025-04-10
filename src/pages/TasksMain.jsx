import { Box, CssBaseline, Typography } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import NavBar from "../components/NavBar";
import * as React from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
const drawerWidth = 240;

const projectsList = [
  { id: 1, name: "Car restoration", description: "A project to restore a car" },
  { id: 2, name: "Build a tasklist application", description: "A project to build a tasklist application" },
  { id: 3, name: "Start a web development business", description: "A project to start a web development business" },
];

export default function TasksMain() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [projectsLists] = React.useState(projectsList);
  // const [selectedProjectIndex, setSelectedProjectIndex] = React.useState(0);

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
  // const selectedProject = projectsLists[selectedProjectIndex];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
          ml: { sm: `${drawerWidth}px` },
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          mt: 10,
          pl: 3,
        }}
      >
        <AddTaskForm />
        <TaskList />
      </Box>
      <ResponsiveDrawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        projectsLists={projectsLists}
      />
    </Box>
  );
}
