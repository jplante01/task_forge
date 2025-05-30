import React, { createContext, useContext, useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/permanent-marker";

const ThemeModeContext = createContext();

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));
  const setThemeMode = (newMode) => {
    if (["light", "dark"].includes(newMode)) setMode(newMode);
  };

  const theme = createTheme({
    cssVariables: true,
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      logoFont: {
        fontFamily: "Permanent Marker",
        fontSize: "2rem",
      },
    },
    palette: {
      mode,
      primary: { main: mode === "light" ? "#1976d2" : "#90caf9" },
      secondary: { main: mode === "light" ? "#dc004e" : "#f48fb1" },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
  });

  return (
    <ThemeModeContext.Provider value={{
      mode,
      theme,
      toggleMode,
      setThemeMode,
      isDark: mode === "dark",
      isLight: mode === "light",
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      {children}
    </ThemeProvider>
    
    </ThemeModeContext.Provider>
  );
}

export function useThemeModeContext() {
  return useContext(ThemeModeContext);
}