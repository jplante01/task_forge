import { createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";
import "@fontsource/permanent-marker";
import { useToggleColorMode } from "./hooks/useAppTheme";

const { mode } = useToggleColorMode();

const theme = createTheme({
  cssVariables: true,
  typography: {
    logoFont: {
      fontFamily: "Permanent Marker",
      fontSize: "2rem",
    },
  },
  palette: {
    mode: mode,
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    grey: {
      ...grey,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
