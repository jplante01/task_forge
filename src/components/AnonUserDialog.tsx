import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface AnonUserDialogProps {
  showAnonDialog: boolean;
  handleAnonDialogClose: () => void;
}

export default function AnonUserDialog({
  showAnonDialog,
  handleAnonDialogClose,
}: AnonUserDialogProps) {
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
