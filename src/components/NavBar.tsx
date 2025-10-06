import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DarkMode } from "@mui/icons-material";
import { useThemeModeContext } from "../contexts/ThemeModeContext";
import type { Database } from "../types/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface NavBarProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  selectedProject: Project | null;
}

export default function NavBar({
  drawerWidth,
  handleDrawerToggle,
  selectedProject,
}: NavBarProps) {
  const { toggleMode } = useThemeModeContext();
  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" noWrap component="div">
            {!selectedProject
              ? ""
              : selectedProject.name || "No project selected"}
          </Typography>
          <Button
            variant="outlined"
            endIcon={<DarkMode />}
            onClick={() => toggleMode()}
            sx={{
              color: "text.secondary",
              borderColor: "text.secondary",
            }}
          >
            Mode
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
