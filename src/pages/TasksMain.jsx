import { Box, CssBaseline } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import NavBar from "../components/NavBar";
import * as React from "react";

const drawerWidth = 240;



export default function TasksMain() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

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
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar drawerWidth={drawerWidth} />

      <ResponsiveDrawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />
    </Box>
  );
}
