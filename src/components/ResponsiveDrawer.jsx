import { Drawer, Stack, Typography, Box } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
// import TaskForgeLogo from "../logo/TaskForgeLogo.svg";
import AddProjectForm from "./AddProjectForm";
import ProjectListItem from "./ProjectListItem";
import ProjectList from "./ProjectList";
import { useThemeModeContext } from "../contexts/ThemeModeContext";
import { TaskForgeLogo } from "../logo/TaskForgeLogo";
import { Logout } from "@mui/icons-material";

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
}) {
  {
    /* Drawer content provided to both mobile drawer and desktop drawer*/
  }

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
              color: theme.palette.text.main,
              // padding: "0.5rem",
            }}
          />
        </Box>
        <Typography variant="logoFont">TASKFORGE</Typography>
      </Stack>
      <Box sx={{ marginBottom: "2rem" }}>
        <AddProjectForm user={user} />
      </Box>
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
          <Typography variant="body1">Logout</Typography>
          <Logout
            sx={{
              marginBottom: "1rem",
              color: "grey.500",
              "&:hover": { color: theme.palette.text.secondary },
            }}
            onClick={() => {
              signOut();
            }}
          ></Logout>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        // container={container}
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

ResponsiveDrawer.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleDrawerTransitionEnd: PropTypes.func.isRequired,
  setSelectedProjectId: PropTypes.func.isRequired,
  selectedProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  projectsLists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  projectsQueryIsLoading: PropTypes.bool.isRequired,
  projectsQueryIsError: PropTypes.bool.isRequired,
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired,
};

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
