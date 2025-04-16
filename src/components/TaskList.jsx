import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import AddTaskForm from "./AddTaskForm";
const tasks = [
  { id: 1, name: "Rebuild engine", completed: false, starred: true },
  { id: 2, name: "Replace brakes", completed: false, starred: false },
];

const completedTasks = [
  { id: 4, name: "Install new tires", completed: true, starred: false },
  { id: 3, name: "Paint car", completed: true, starred: false },
  { id: 5, name: "Replace broken window", completed: true, starred: false }, 
];

function ActiveTaskItem({ task }) {
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

function CompletedTaskItem({ task }) {
  return (
    <Stack direction="row" spacing={1}>
      <ListItem disablePadding divider>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <Checkbox disableRipple color="gray.500" checked={task.completed} />
        </ListItemIcon>
        <ListItemText primary={task.name} sx={{ color: "grey.500" }} />
        <IconButton disableRipple edge="end" aria-label="star">
          <StarIcon
            sx={{
              color: task.starred ? "yellow" : "grey.400",
              "&:hover": { color: "grey.500" },
            }}
          />
        </IconButton>
      </ListItem>
      <IconButton disableRipple aria-label="delete" size="small">
        <ClearIcon
          sx={{ color: "grey.300", "&:hover": { color: "grey.500" } }}
        />
      </IconButton>
    </Stack>
  );
}

export default function TaskList() {
  return (
    <Stack direction="column" spacing={0}>
      <AddTaskForm />
      <Typography pt={4} variant="subtitle1" sx={{ color: "grey.800", fontWeight: "bold" }}>Active Tasks</Typography>
      <List>
        {tasks.map((task) => (
          <ActiveTaskItem key={task.id} task={task} />
        ))}
      </List>
      <Typography pt={4} variant="subtitle1" sx={{ color: "grey.800", fontWeight: "bold" }}>Completed Tasks</Typography>
      <List>
        {completedTasks.map((task) => (
          <CompletedTaskItem key={task.id} task={task} />
        ))}
      </List>
    </Stack>
  );
}

ActiveTaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

CompletedTaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};
