import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../contexts/AuthContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function PasswordResetForm() {
  const { resetPassword: updatePassword } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    const data = new FormData(event.currentTarget);
    const password1 = data.get("password-1");
    const password2 = data.get("password-2");
    console.log("Password1", password1);
    console.log("Password2", password2);
    if (password1 !== password2) {
      setError("Passwords do not match");
    } else {
      console.log(password1, password2);
      updatePassword(password1);
      console.log("Password updated");
      setError(null);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password{" "}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            name="password-1"
            id="password-1"
            label="Enter your new password"
            // autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password-2"
            label="Re-enter your new password"
            type="password"
            id="password-2"
            // autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password{" "}
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
