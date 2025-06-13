import React from "react";
import SignInForm from "../components/SignInForm";
import { Card, CardContent, Box } from "@mui/material";

export default function Login() {
  return (
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
  );
}
