
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function NavBar() {
    return (
      <AppBar
        sx={{
          position: { xs: "fixed", sm: "relative" },
        }}
      >
        <Toolbar>
          <Typography variant="h6">Tasks</Typography>
        </Toolbar>
      </AppBar>
    );
}