import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { createTheme, Theme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/permanent-marker";
import { red, grey } from "@mui/material/colors";

type ThemeMode = "light" | "dark";

interface ThemeModeContextValue {
  mode: ThemeMode;
  theme: Theme;
  toggleMode: () => void;
  setThemeMode: (newMode: ThemeMode) => void;
  isDark: boolean;
  isLight: boolean;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(
  undefined
);

const getThemeConfig = (mode: ThemeMode) => ({
  cssVariables: true,
  typography: {
    fontFamily:
      '"IBM Plex Mono", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    logoFont: {
      fontFamily: "Permanent Marker",
      fontSize: "2rem",
    },
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#00A376" },
          secondary: { main: "#dc004e" },
          background: {
            default: "#f5f5f5",
            paper: "#ffffff",
          },
        }
      : {
          primary: { main: "#49cca7" },
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

interface ThemeModeProviderProps {
  children: ReactNode;
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Handle SSR/hydration issues
    if (typeof window === "undefined") return "light";

    const savedMode = localStorage.getItem("themeMode");
    return (savedMode as ThemeMode) || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const setThemeMode = (newMode: ThemeMode) => {
    if (["light", "dark"].includes(newMode)) {
      setMode(newMode);
    }
  };

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
    [mode, theme]
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

export function useThemeModeContext(): ThemeModeContextValue {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error(
      "useThemeModeContext must be used within a ThemeModeProvider"
    );
  }
  return context;
}

export function useThemeMode() {
  const { mode, toggleMode, setThemeMode, isDark, isLight } =
    useThemeModeContext();
  return { mode, toggleMode, setThemeMode, isDark, isLight };
}

export function useTheme(): Theme {
  const { theme } = useThemeModeContext();
  return theme;
}
