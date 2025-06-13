import React from "react";
import SignInForm from "../components/SignInForm";
import { Box, Stack, Typography, Button } from "@mui/material";
import { TaskForgeLogo } from "../logo/TaskForgeLogo";
import { useThemeModeContext } from "../contexts/ThemeModeContext";

export default function Login() {
  const { theme } = useThemeModeContext();

  return (
    <Stack sx={{ height: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ padding: "1rem", marginBottom: "2rem" }}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              width: "80px",
              height: "80px",
              marginRight: "0.5rem",
            }}
          >
            <TaskForgeLogo
              sx={{
                width: "100%",
                height: "100%",
                color: theme.palette.text.main,
                // padding: "0.5rem",
              }}
            />
          </Box>
          <Typography variant="logoFont">TASKFORGE</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" sx={{ marginRight: "0.5rem" }}>
            Don&apos;t have an account?
          </Typography>
          <Button variant="contained" color="primary">
            Sign up
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* <Card variant="outlined"> */}
        {/* <CardContent> */}
        <SignInForm />
        {/* </CardContent> */}
        {/* </Card> */}
      </Box>
    </Stack>
  );
}
