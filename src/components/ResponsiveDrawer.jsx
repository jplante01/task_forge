import {
  Drawer,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import TaskForgeLogo from "../logo/TaskForgeLogo.svg";
import FolderIcon from "@mui/icons-material/Folder";

{
  /* Project list item component */
}
function ProjectListItem({ project }) {
  return (
    <ListItem>
      <ListItemIcon sx={{ minWidth: 0 }}>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText
        primary={project.name}
        slotProps={{
          primary: {
            noWrap: true,
            sx: {
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          },
        }}
        sx={{
          marginLeft: "0.5rem",
        }}
      />
    </ListItem>
  );
}

export default function ResponsiveDrawer({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  projectsLists,
}) {
  {
    /* Drawer content provided to both mobile drawer and desktop drawer*/
  }
  const drawer = (
    <Stack>
      <img
        src={TaskForgeLogo}
        alt="TaskForge Logo"
        style={{ width: "100%", padding: "1rem" }}
      />
      <List >
        {projectsLists.map((project) => (
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
