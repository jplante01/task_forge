import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DarkMode } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useThemeModeContext } from "../contexts/ThemeModeContext";

export default function NavBar({
  drawerWidth,
  handleDrawerToggle,
  selectedProject,
}) {
  const { toggleMode } = useThemeModeContext();
  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Stack direction="row" width="100%" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap component="div">
            {!selectedProject ? (
              ""
            ) : (
              selectedProject.name || "No project selected"
              // projects.find((project) => project.id === selectedProjectId)?.name ||
              // "No project selected"
            )}
          </Typography>
          {/* TODO: insert a theme toggle */}
          <DarkMode onClick={() => toggleMode()}/>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  selectedProject: PropTypes.shape({
    name: PropTypes.string,
    // add other properties of selectedProject if needed
  }),
  selectedProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  projects: PropTypes.object, // or PropTypes.array if projects is an array
};

// This is pulling the projects from the local dev db
// TODO: Pull the user from the auth context rather than hardcoding it
//
