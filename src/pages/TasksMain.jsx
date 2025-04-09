import { Box, CssBaseline } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import NavBar from "../components/NavBar";
import * as React from "react";

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
