import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import Copyright from "./Copyright";

export default function SignInForm({ toggleDialog }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInAnonymously, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleAnonLogin = async (e) => {
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
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
            // error={!!emailError}
            // helperText={emailError ? emailError : " "}
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
            onChange={(e) => setPassword(e.target.value)}
            // error={true}
            helperText={error ? error : " "}
            sx={{
              "& .MuiFormHelperText-root": {
                minHeight: "20px", // Always reserve space
                // margin: "3px 14px 0",
                color: "red",
                fontSize: "1.2rem",
                margin: "1rem 0rem 0rem 0rem",
              },
            }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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

          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item xs>
              <Link
                variant="body2"
                sx={{ cursor: "pointer" }}
                onClick={toggleDialog}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs>
              <Link
                variant="body2"
                sx={{ cursor: "pointer" }}
                onClick={handleAnonLogin}
              >
                Login as Guest
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

SignInForm.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
};
