import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import projectsApi from "../api/projects";
import { UIStateContext } from "../contexts/UIStateContext";
import { useContext } from "react";
export default function NavBar({ drawerWidth, handleDrawerToggle }) {
  const user = { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" };
  const { selectedProject } = useContext(UIStateContext);
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => projectsApi.getProjectsByUserId(user?.id),
  });

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
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : isError ? (
            <Typography>Error loading projects</Typography>
          ) : projects ? (
            projects.find((project) => project.id === selectedProject)?.name ||
            "No project selected"
          ) : (
            "Loading..."
          )}
        </Typography>{" "}
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

// This is pulling the projects from the local dev db
// TODO: Pull the user from the auth context rather than hardcoding it
// 