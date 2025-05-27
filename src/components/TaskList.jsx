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
import { useGetTasksByProjectId, useDeleteTaskById } from "../hooks/queries/tasks";




function ActiveTaskItem({
  task,
  toggleTaskComplete,
  handleClickDelete,
  // toggleTaskStarred,
  // deleteTask,
}) {
  return (
    <Stack direction="row" spacing={1}>
      <ListItem disablePadding divider>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <Checkbox
            disableRipple
            checked={task.completed}
            onChange={() =>
              toggleTaskComplete.mutate({
                id: task.id,
                completed: task.completed,
              })
            }
          />
        </ListItemIcon>
        <ListItemText primary={task.title} />
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
        <ClearIcon onClick={handleClickDelete}
          sx={{ color: "grey.300", "&:hover": { color: "grey.500" } }}
        />
      </IconButton>
    </Stack>
  );
}

function CompletedTaskItem({
  task,
  handleClickDelete
  // toggleTaskComplete,
  // toggleTaskStarred,
  // deleteTask,
}) {
  return (
    <Stack direction="row" spacing={1}>
      <ListItem disablePadding divider>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <Checkbox
            disableRipple
            color="gray.500"
            checked={task.completed}
            // onChange={() =>
            //   toggleTaskComplete.mutate({
            //     id: task.id,
            //     completed: task.completed,
            //   })
            // }
          />
        </ListItemIcon>
        <ListItemText primary={task.title} sx={{ color: "grey.500" }} />
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
        <ClearIcon onClick={handleClickDelete}
          sx={{ color: "grey.300", "&:hover": { color: "grey.500" } }}
        />
      </IconButton>
    </Stack>
  );
}

export default function TaskList({ projectId }) {

  const { mutate: deleteTaskById } = useDeleteTaskById();

  const { data: tasks, isPending, isError, error } = useGetTasksByProjectId(projectId, {enabled: !!projectId});
  
  const handleClickDelete = (id) => {
    deleteTaskById({ taskId: id, projectId });
  };

  if (isPending) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading Tasks: {error.message}</Typography>;
  }

  if (tasks) {
    const completedTasks = tasks.filter((task) => task.completed);
    const activeTasks = tasks.filter((task) => !task.completed);
    return (
      <Stack direction="column" spacing={0}>
        <AddTaskForm />
        <Typography
          pt={4}
          variant="subtitle1"
          sx={{ color: "grey.800", fontWeight: "bold" }}
        >
          Active Tasks
        </Typography>
        {activeTasks.length === 0 ? (
          <Typography>No active tasks</Typography>
        ) : (
          <List>
            {activeTasks.map((task) => (
              <ActiveTaskItem
                key={task.id}
                task={task}
                deleteTaskById={deleteTaskById}
                handleClickDelete={() => handleClickDelete(task.id)}
                // toggleTaskComplete={toggleTaskComplete}
                // toggleTaskStarred={toggleTaskStarred}
                // deleteTask={deleteTask}
              />
            ))}
          </List>
        )}
        <Typography
          pt={4}
          variant="subtitle1"
          sx={{ color: "grey.800", fontWeight: "bold" }}
        >
          Completed Tasks
        </Typography>
        <List>
          {completedTasks.map((task) => (
            <CompletedTaskItem
              key={task.id}
              task={task}
              deleteTaskById={deleteTaskById}
              handleClickDelete={() => handleClickDelete(task.id)}
              // toggleTaskComplete={toggleTaskComplete}
              // toggleTaskStarred={toggleTaskStarred}
              // deleteTask={deleteTask}
            />
          ))}
        </List>
      </Stack>
    );
  }

  return (
    <Typography
      pt={4}
      variant="subtitle1"
      sx={{ color: "grey.800", fontWeight: "bold" }}
    >
      No tasks found
    </Typography>
  );
}

ActiveTaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  toggleTaskComplete: PropTypes.object.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  toggleTaskStarred: PropTypes.object,
  deleteTask: PropTypes.object,
};

CompletedTaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
};

TaskList.propTypes = {
  projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
