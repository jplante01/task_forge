import * as React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import PropTypes from "prop-types";

export default function ProjectListItem({ project }) {
  return (
    <ListItem disableGutters>
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

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
