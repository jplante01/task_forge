import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../contexts/AuthContext";

interface PasswordResetDialogProps {
  dialogOpen: boolean;
  toggleDialog: () => void;
}

export default function PasswordResetDialog({
  dialogOpen,
  toggleDialog
}: PasswordResetDialogProps) {
  const { requestPasswordResetEmail } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => {
    setShowConfirmation(false);
    toggleDialog();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email as string;
    requestPasswordResetEmail(email);
    setShowConfirmation(true);
    toggleDialog();
  };

  if (!showConfirmation) {
    return (
      <React.Fragment>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your email address here to reset your password.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Request Reset</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle>Reset Request sent</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please check your email for a link to reset your password.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              disabled
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Return to Login</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
