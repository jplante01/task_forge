import React from "react";
import { TaskForgeLogo } from "../logo/TaskForgeLogo";
import { useThemeModeContext } from "../contexts/ThemeModeContext";
import PasswordResetForm from "../components/PasswordResetForm";
import { Stack, Typography, Button, Box, Link } from "@mui/material";

export default function ResetPassword() {
  const { theme } = useThemeModeContext();
  return (
    <React.Fragment>
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
              <Link href="/">
                <TaskForgeLogo
                  sx={{
                    width: "100%",
                    height: "100%",
                    color: theme.palette.text.primary,
                    // padding: "0.5rem",
                  }}
                />
              </Link>
            </Box>
            <Typography
              variant="logoFont"
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              TASKFORGE
            </Typography>
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
          <PasswordResetForm />
        </Box>
      </Stack>
    </React.Fragment>
  );
}
