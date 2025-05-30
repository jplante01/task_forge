import { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import "@fontsource/permanent-marker";


// Custom hook for theme management
function useThemeMode() {
  const [mode, setMode] = useState(() => {
    // Initialize from localStorage or default to 'light'
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  // Persist theme mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Method to toggle between light and dark
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  
  // Method to set specific mode
  const setThemeMode = (newMode) => {
    if (["light", "dark"].includes(newMode)) {
      setMode(newMode);
    }
  };

  // Old theme object 
  // const theme = createTheme({
  //   cssVariables: true,
  //   typography: {
  //     logoFont: {
  //       fontFamily: "Permanent Marker",
  //       fontSize: "2rem",
  //     },
  //   },
  //   palette: {
  //     mode: mode,
  //     primary: {
  //       main: "#556cd6",
  //     },
  //     secondary: {
  //       main: "#19857b",
  //     },
  //     grey: {
  //       ...grey,
  //     },
  //     error: {
  //       main: red.A400,
  //     },
  //   },
  // });

  // Create theme based on current mode
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
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },
      secondary: {
        main: mode === "light" ? "#dc004e" : "#f48fb1",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },

  });

  return {
    mode, // Current mode string ('light' or 'dark')
    theme, // Complete MUI theme object
    toggleMode, // Function to toggle between modes
    setThemeMode, // Function to set specific mode
    isDark: mode === "dark", // Boolean helper
    isLight: mode === "light", // Boolean helper
  };
}

export default useThemeMode;