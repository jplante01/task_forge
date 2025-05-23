import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { UIStateProvider } from "./contexts/UIStateContext";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <UIStateProvider>
            <App />
          </UIStateProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
