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
import {
  useGetTasksByProjectId,
  useDeleteTaskById,
  useUpdateTaskById,
} from "../hooks/queries/tasks";

function ActiveTaskItem({
  task,
  handleClickDelete,
  handleToggleStarred,
  handleToggleCompleted

}) {
  return (
    <Stack direction="row" spacing={1}>
      <ListItem disablePadding divider>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <Checkbox
            disableRipple
            checked={task.completed}
            onClick={handleToggleCompleted}
          />
        </ListItemIcon>
        <ListItemText primary={task.title} />
        <IconButton disableRipple edge="end" aria-label="star">
          <StarIcon
            onClick={handleToggleStarred}
            sx={{
              color: task.starred ? "yellow" : "grey.400",
              "&:hover": { color: "grey.500" },
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

function CompletedTaskItem({
  task,
  handleClickDelete,
  handleToggleStarred,
  handleToggleCompleted

}) {
  return (
    <Stack direction="row" spacing={1}>
      <ListItem disablePadding divider>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <Checkbox
            disableRipple
            color="gray.500"
            checked={task.completed}
            onClick={handleToggleCompleted }
          />
        </ListItemIcon>
        <ListItemText primary={task.title} sx={{ color: "grey.500" }} />
        <IconButton disableRipple edge="end" aria-label="star">
          <StarIcon
            onClick={handleToggleStarred}
            sx={{
              color: task.starred ? "yellow" : "grey.400",
              "&:hover": { color: "grey.500" },
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

export default function TaskList({ projectId }) {
  const { mutate: deleteTaskById } = useDeleteTaskById();

  const {
    data: tasks,
    isPending,
    isError,
    error,
  } = useGetTasksByProjectId(projectId, { enabled: !!projectId });

  const { mutate: updateTaskById } = useUpdateTaskById();

  const handleClickDelete = (id) => {
    deleteTaskById({ taskId: id, projectId });
  };

  const handleToggleStarred = (id) => {
    const task = tasks.find((task) => task.id === id);
    // console.log("task", task); works
    if (!task) return;

    updateTaskById({
      taskId: task.id,
      projectId: projectId,
      updates: {starred: !task.starred},
    });
  };

  const handleToggleCompleted = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;
    updateTaskById({
      taskId: task.id,
      projectId: projectId,
      updates: { completed: !task.completed },
    });
  }

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
        <AddTaskForm projectId={projectId}/>
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
                deleteTaskById={deleteTaskById} // TODO: remove?
                handleClickDelete={() => handleClickDelete(task.id)}
                handleToggleStarred={() => handleToggleStarred(task.id)}
                handleToggleCompleted={() => handleToggleCompleted(task.id)}
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
              handleToggleStarred={() => handleToggleStarred(task.id)}
              handleToggleCompleted={() => handleToggleCompleted(task.id)}
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
  handleClickDelete: PropTypes.func.isRequired,
  handleToggleStarred: PropTypes.func.isRequired,
  handleToggleCompleted: PropTypes.func.isRequired,
};

CompletedTaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleToggleStarred: PropTypes.func.isRequired,
  handleToggleCompleted: PropTypes.func.isRequired,
};
TaskList.propTypes = {
  projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
