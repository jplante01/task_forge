import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  Link,
} from "@mui/material";
import Copyright from "./Copyright";

interface SignInFormProps {
  toggleDialog: () => void;
}

export default function SignInForm({ toggleDialog }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInAnonymously, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleAnonLogin = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await signInAnonymously();
      navigate("/");
    } catch (error) {
      console.error("Anon login error:", error);
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
        <Box sx={{ display: "flex", alignItems: "left", width: "100%" }}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            helperText={error ? error : " "}
            sx={{
              "& .MuiFormHelperText-root": {
                minHeight: "20px",
                color: "red",
                fontSize: "1.2rem",
                margin: "1rem 0rem 0rem 0rem",
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            loading={loading}
          >
            Sign In
          </Button>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Link
              variant="body2"
              sx={{ cursor: "pointer" }}
              onClick={toggleDialog}
            >
              Forgot password?
            </Link>
            <Link
              variant="body2"
              sx={{ cursor: "pointer" }}
              onClick={handleAnonLogin}
            >
              Login as Guest
            </Link>
          </Stack>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
