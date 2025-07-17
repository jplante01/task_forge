import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function AnonUserDialog({
  showAnonDialog,
  handleAnonDialogClose,
}) {
  return (
    <Dialog open={showAnonDialog} onClose={handleAnonDialogClose}>
      <DialogTitle>Welcome, Guest!</DialogTitle>
      <DialogContent>
        <Typography>
          This anonymous login mode allows you to tour the app without creating
          an account. All data entered in this mode will be lost when you close
          the app.
        </Typography>
        <Typography sx={{ mt: 2 }}>
          I hope you enjoy my work, and thank you for looking!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAnonDialogClose}>Continue as Guest</Button>
        {/* <Button onClick="" variant="contained">
          Create Account
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}

AnonUserDialog.propTypes = {
  showAnonDialog: PropTypes.bool.isRequired,
  handleAnonDialogClose: PropTypes.func.isRequired,
};
