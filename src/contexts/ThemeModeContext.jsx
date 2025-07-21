import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/permanent-marker";
import { red, grey } from "@mui/material/colors";

const ThemeModeContext = createContext();

// Theme configuration separated for better maintainability
const getThemeConfig = (mode) => ({
  cssVariables: true,
  typography: {
    fontFamily: '"IBM Plex Mono", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    logoFont: {
      fontFamily: "Permanent Marker",
      fontSize: "2rem",
    },
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode colors
          primary: { main: "#1976d2" },
          secondary: { main: "#dc004e" },
          background: {
            default: "#f5f5f5",
            paper: "#ffffff",
          },
        }
      : {
          // Dark mode colors
          primary: { main: "#90caf9" },
          secondary: { main: "#f48fb1" },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
        }),
    grey: {
      ...grey,
    },
    error: {
      main: red.A400,
    },
  },
});

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    // Handle SSR/hydration issues
    if (typeof window === "undefined") return "light";

    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const setThemeMode = (newMode) => {
    if (["light", "dark"].includes(newMode)) {
      setMode(newMode);
    }
  };

  // Memoize theme creation to prevent unnecessary re-renders
  const theme = useMemo(() => createTheme(getThemeConfig(mode)), [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      theme,
      toggleMode,
      setThemeMode,
      isDark: mode === "dark",
      isLight: mode === "light",
    }),
    [mode, theme, toggleMode, setThemeMode],
  );

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

ThemeModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useThemeModeContext() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error(
      "useThemeModeContext must be used within a ThemeModeProvider",
    );
  }
  return context;
}

// Optional: Export individual hooks for specific needs
export function useThemeMode() {
  const { mode, toggleMode, setThemeMode, isDark, isLight } =
    useThemeModeContext();
  return { mode, toggleMode, setThemeMode, isDark, isLight };
}

export function useTheme() {
  const { theme } = useThemeModeContext();
  return theme;
}
