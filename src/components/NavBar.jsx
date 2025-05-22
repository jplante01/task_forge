import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
// import { getProjectsByUser } from "../hooks/queries/projects";
export default function NavBar({ drawerWidth, handleDrawerToggle, selectedProject }) {

  // const { data: project, isLoading, isError } = getProjectById(selectedProjectId, { enabled: !!projects});

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
        <Typography variant="h6" noWrap component="div">
          {!selectedProject ? (
            <Typography>Loading...</Typography>
          ) : (
            selectedProject.name || 'No project selected'
            // projects.find((project) => project.id === selectedProjectId)?.name ||
            // "No project selected"
          )}
        </Typography>{" "}
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
  selectedProjectId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  projects: PropTypes.object, // or PropTypes.array if projects is an array
};

// This is pulling the projects from the local dev db
// TODO: Pull the user from the auth context rather than hardcoding it
//
