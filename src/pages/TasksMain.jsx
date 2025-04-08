import { Stack, Typography } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

export default function TasksMain() {
    return (
      <Stack direction="row" spacing={0}>
        <ResponsiveDrawer />
        <Stack>
          <Typography>Tasks</Typography>
        </Stack>
      </Stack>
    )
}