import { Drawer, Stack, Typography } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";

export default function ResponsiveDrawer({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
}) {
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
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
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

ResponsiveDrawer.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleDrawerTransitionEnd: PropTypes.func.isRequired,
};
