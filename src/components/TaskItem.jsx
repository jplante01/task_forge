import * as React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import { useThemeModeContext } from "../contexts/ThemeModeContext";

export default function TaskItem({
  task,
  handleClickDelete,
  handleToggleStarred,
  handleToggleCompleted,
  completed,
}) {
  const { theme } = useThemeModeContext();
  return (
    <Stack direction="row" spacing={1}>
      <ListItem disablePadding divider>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <Checkbox
            disableRipple
            checked={task.completed}
            onClick={handleToggleCompleted}
            color="gray.500"
          />
        </ListItemIcon>
        <ListItemText
          primary={task.title}
          sx={{ color: completed ? "grey.500" : theme.palette.text.primary }}
        />
        <IconButton disableRipple edge="end" aria-label="star">
          <StarIcon
            onClick={handleToggleStarred}
            sx={{
              color: task.starred ? "yellow" : "grey.400",
            }}
          />
        </IconButton>
      </ListItem>
      <IconButton disableRipple aria-label="delete" size="small">
        <ClearIcon
          onClick={handleClickDelete}
          sx={{ color: "grey.300", "&:hover": { color: "grey.500" } }}
        />
      </IconButton>
    </Stack>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    starred: PropTypes.bool.isRequired,
  }).isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleToggleStarred: PropTypes.func.isRequired,
  handleToggleCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
};
