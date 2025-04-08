import { Drawer, Stack, Typography } from "@mui/material";

export default function ResponsiveDrawer() {
    return (
      <Drawer open={true} anchor="left" variant="permanent">
        <Stack>
          <Typography>TasksLogo</Typography>
        </Stack>
      </Drawer>
    );
}