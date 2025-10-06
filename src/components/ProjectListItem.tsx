import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import type { Database } from "../types/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ProjectListItemProps {
  project: Project;
  setSelectedProjectId: (projectId: string) => void;
  isSelected: boolean;
  handleDrawerToggle: () => void;
}

export default function ProjectListItem({
  project,
  setSelectedProjectId,
  isSelected,
  handleDrawerToggle
}: ProjectListItemProps) {
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
