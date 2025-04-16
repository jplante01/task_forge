import {
  Drawer,
  Stack,
  Typography,
  List,
} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import TaskForgeLogo from "../logo/TaskForgeLogo.svg";
import AddProjectForm from "./AddProjectForm";
import ProjectListItem from "./ProjectListItem";
import { projects as projectsData } from "../data/seedData";
import { useQuery } from "@tanstack/react-query";


export default function ResponsiveDrawer({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
}) {


  //fetching projects
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      new Promise((resolve) =>
        setTimeout(() => resolve([...projectsData]), 1000),
  ),
});

{
  /* Drawer content provided to both mobile drawer and desktop drawer*/
}
const drawer = (
  <Stack margin="1rem">
      <Stack direction="row" alignItems="center" sx={{ padding: "1rem" }}>
        <img
          src={TaskForgeLogo}
          alt="TaskForge Logo"
          style={{
            width: "80px",
            height: "80px",
            color: "primary",
            padding: "0.5rem",
          }}
          />
        <Typography variant="logoFont">TASKFORGE</Typography>
      </Stack>
      <AddProjectForm />
      <List>
        {isLoading ? <Typography>Loading...</Typography>: isError ? <Typography>Error loading projects</Typography> :
        projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </List>
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
  projectsLists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};