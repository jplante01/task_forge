import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
const tasks = [
  { id: 1, name: "Rebuild engine", completed: false, starred: true },
  { id: 2, name: "Replace brakes", completed: false, starred: false },
  { id: 3, name: "Paint car", completed: true, starred: false },
  { id: 4, name: "Install new tires", completed: false, starred: false },
  { id: 5, name: "Replace broken window", completed: true, starred: false },
];

function TaskItem({ task }) {
  return (
    <Stack direction="row" spacing={2}>
      <ListItem disablePadding divider>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <Checkbox checked={task.completed} />
        </ListItemIcon>
        <ListItemText primary={task.name} />
        <IconButton edge="end" aria-label="star">
          <StarIcon sx={{ color: task.starred ? "yellow" : "inherit" }} />
        </IconButton>
      </ListItem>
      <IconButton  aria-label="delete" size="small" >
        <ClearIcon sx={{ color: "grey[100]"}} />
      </IconButton>
    </Stack>
  );
}

export default function TaskList() {
  return (
    <Box sx={{ width: "80%" }}>
      <List disableGutters>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    </Box>
  );
}
