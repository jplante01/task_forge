import { useState } from "react";
import SignInForm from "../components/SignInForm";
import { Box, Stack, Typography, Button } from "@mui/material";
import { TaskForgeLogo } from "../logo/TaskForgeLogo";
import { useThemeModeContext } from "../contexts/ThemeModeContext";
import RegisterForm from "../components/RegisterForm";
import PasswordResetDialog from "../components/PasswordResetDialog";
import { useNotification } from "../contexts/NotificationContext";

// TODO: REMOVE BEFORE COMMIT - Test notification buttons
function TestNotificationButtons() {
  const { showSuccess, showError, showInfo, showWarning } = useNotification();

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      <Button size="small" variant="contained" color="success" onClick={() => showSuccess("Task created successfully!")}>
        Success
      </Button>
      <Button size="small" variant="contained" color="error" onClick={() => showError("Failed to delete task. Please try again.")}>
        Error
      </Button>
      <Button size="small" variant="contained" color="info" onClick={() => showInfo("Loading your data...")}>
        Info
      </Button>
      <Button size="small" variant="contained" color="warning" onClick={() => showWarning("Your session will expire soon")}>
        Warning
      </Button>
    </Stack>
  );
}

export default function Login() {
  const { theme } = useThemeModeContext();
  const [register, setRegister] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const toggleForm = () => {
    console.log("register");
    setRegister(!register);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <>
      <Stack sx={{ height: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ padding: { xs: "0.5rem", sm: "1.5rem" }, marginBottom: "2rem" }}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <Box
              sx={{
                width: { xs: "60px", sm: "80px" },
                height: { xs: "60px", sm: "80px" },
                marginRight: "0.5rem",
              }}
            >
              <TaskForgeLogo
                sx={{
                  width: "100%",
                  height: "100%",
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
            <Typography
              variant="logoFont"
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              TASKFORGE
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography
              variant="body1"
              sx={{
                marginRight: "0.5rem",
                display: { xs: "none", sm: "block" },
                color: theme.palette.text.secondary,
              }}
            >
              {register ? "Already have an account?" : "Don't have an account?"}
            </Typography>
            <Button variant="outlined" color="primary" onClick={toggleForm}>
              {register ? "Sign in" : "Sign up"}
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginTop: "2rem",
          }}
        >
          {register ? (
            <RegisterForm />
          ) : (
            <SignInForm toggleDialog={toggleDialog} />
          )}
        </Box>
      </Stack>
      <PasswordResetDialog
        dialogOpen={dialogOpen}
        toggleDialog={toggleDialog}
      />
      <TestNotificationButtons /> {/* TODO: REMOVE BEFORE COMMIT */}
    </>
  );
}
