import * as React from "react";
import {
  List,
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
const tasks = [
  { id: 1, name: "Rebuild engine", completed: false, starred: true },
  { id: 2, name: "Replace brakes", completed: false, starred: false },
  { id: 3, name: "Paint car", completed: true, starred: false },
  { id: 4, name: "Install new tires", completed: false, starred: false },
  { id: 5, name: "Replace broken window", completed: true, starred: false },
];

function TaskItem({ task }) {
  return (
    <Stack direction="row" spacing={1}>
      <ListItem disablePadding divider>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <Checkbox disableRipple checked={task.completed} />
        </ListItemIcon>
        <ListItemText primary={task.name} />
        <IconButton disableRipple edge="end" aria-label="star">
          <StarIcon  sx={{ color: task.starred ? "yellow" : "grey.400", "&:hover": { color: "grey.500" } }} />
        </IconButton>
      </ListItem>
      <IconButton disableRipple aria-label="delete" size="small">
        <ClearIcon sx={{ color: "grey.300", "&:hover": { color: "grey.500" } }} />
      </IconButton>
    </Stack>
  );
}

export default function TaskList() {
  return (
      <List >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
  );
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};
