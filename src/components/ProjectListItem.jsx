import * as React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import PropTypes from "prop-types";

export default function ProjectListItem({ project, setSelectedProjectId, isSelected, handleDrawerToggle }) {
  const handleClick = () => {
    setSelectedProjectId(project.id);
    handleDrawerToggle();
  };
  return (
    <ListItem
      disableGutters
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        backgroundColor: isSelected ? "action.selected" : "transparent",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
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
              fontWeight: isSelected ? "bold" : "normal",
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
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};
