import { Drawer, Stack, Typography } from "@mui/material";
import * as React from "react";


export default function ResponsiveDrawer({ drawerWidth, mobileOpen, handleDrawerClose, handleDrawerToggle, handleDrawerTransitionEnd }) {


    const drawer = (
      <Stack>
        <Typography>DrawerContent</Typography>
      </Stack>
    );
  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        // container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
