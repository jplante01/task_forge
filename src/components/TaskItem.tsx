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
import { useThemeModeContext } from "../contexts/ThemeModeContext";
import type { Database } from "../types/supabase";

type Task = Database["public"]["Tables"]["tasks"]["Row"];

interface TaskItemProps {
  task: Task;
  handleClickDelete: () => void;
  handleToggleStarred: () => void;
  handleToggleCompleted: () => void;
  completed: boolean;
}

export default function TaskItem({
  task,
  handleClickDelete,
  handleToggleStarred,
  handleToggleCompleted,
  completed,
}: TaskItemProps) {
  const { theme } = useThemeModeContext();
  return (
    <Stack direction="row" spacing={1}>
      <ListItem disablePadding divider>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <Checkbox
            disableRipple
            checked={task.completed}
            onClick={handleToggleCompleted}
            color="default"
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
