import React, { useState } from "react";
import SignInForm from "../components/SignInForm";
import { Box, Stack, Typography, Button } from "@mui/material";
import { TaskForgeLogo } from "../logo/TaskForgeLogo";
import { useThemeModeContext } from "../contexts/ThemeModeContext";
import RegisterForm from "../components/RegisterForm";

export default function Login() {
  const { theme } = useThemeModeContext();
  const [register, setRegister] = useState(false);

  const toggleForm = () => {
    console.log("register");
    setRegister(!register);
  };

  return (
    <Stack sx={{ height: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ padding: {xs: "0.5rem", sm: "1.5rem"}, marginBottom: "2rem" }}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              width: {xs: "60px", sm: "80px"},
              height: {xs: "60px", sm: "80px"},
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
          <Typography variant="logoFont" sx={{ fontSize: {xs: '1.5rem', sm: '2rem'} }}>TASKFORGE</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" sx={{ marginRight: "0.5rem", display: {xs: 'none', sm: 'block'}, color: theme.palette.text.secondary }}>
            {register ? "Already have an account?" : "Don't have an account?"}
          </Typography>
          <Button variant="contained" color="primary" onClick={toggleForm}>
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
        {/* <Card variant="outlined"> */}
        {/* <CardContent> */}
          {register ? <RegisterForm /> : <SignInForm />}
        {/* </CardContent> */}
        {/* </Card> */}
      </Box>
    </Stack>
  );
}
