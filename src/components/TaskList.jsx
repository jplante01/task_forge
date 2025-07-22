import * as React from "react";
import {
  List,
  Typography,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";
import {
  useGetTasksByProjectId,
  useDeleteTaskById,
  useUpdateTaskById,
} from "../hooks/queries/tasks";

export default function TaskList({ projectId }) {
  const { mutate: deleteTaskById } = useDeleteTaskById();

  const {
    data: tasks,
    isError,
    error,
  } = useGetTasksByProjectId(projectId, { enabled: !!projectId });

  const { mutate: updateTaskById } = useUpdateTaskById();

  const handleClickDelete = (id) => {
    deleteTaskById({ taskId: id, projectId });
  };

  const handleToggleStarred = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    updateTaskById({
      taskId: task.id,
      projectId: projectId,
      updates: { starred: !task.starred },
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
  };

  if (isError) {
    return <Typography>Error loading Tasks: {error.message}</Typography>;
  }

  if (tasks) {
    const completedTasks = tasks.filter((task) => task.completed);
    const activeTasks = tasks
      .filter((task) => !task.completed)
      .sort((a, b) => {
        if (a.starred && !b.starred) return -1;
        if (!a.starred && b.starred) return 1;
        return 0;
      });
    return (
      <Stack direction="column" spacing={0}>
        <AddTaskForm projectId={projectId} />
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
              <TaskItem
                key={task.id}
                task={task}
                handleClickDelete={() => handleClickDelete(task.id)}
                handleToggleStarred={() => handleToggleStarred(task.id)}
                handleToggleCompleted={() => handleToggleCompleted(task.id)}
                completed={task.completed}
              />
            ))}
          </List>
        )}
        {completedTasks.length > 0 && (
          <Typography
            pt={4}
            variant="subtitle1"
            sx={{ color: "grey.800", fontWeight: "bold" }}
          >
            Completed Tasks
          </Typography>
        )}
        <List>
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleClickDelete={() => handleClickDelete(task.id)}
              handleToggleStarred={() => handleToggleStarred(task.id)}
              handleToggleCompleted={() => handleToggleCompleted(task.id)}
              completed={task.completed}
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
Create a project to begin adding tasks    </Typography>
  );
}

TaskList.propTypes = {
  projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
