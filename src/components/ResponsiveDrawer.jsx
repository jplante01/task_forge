import { Drawer, Stack, Typography } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import TaskForgeLogo from "../logo/TaskForgeLogo.svg";

{/* Project list item component */}
function ProjectListItem({ project }) {
  return <Typography>{project.name}</Typography>;
}

export default function ResponsiveDrawer({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  projectsLists,
}) {

  {/* Drawer content provided to both mobile drawer and desktop drawer*/}
  const drawer = (
    <Stack>
      <img
        src={TaskForgeLogo}
        alt="TaskForge Logo"
        style={{ width: "100%", padding: "1rem" }}
      />
      {projectsLists.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
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
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
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
  projectsLists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
