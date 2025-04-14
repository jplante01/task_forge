import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import "@fontsource/permanent-marker";

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  typography: {
      logoFont: {
      fontFamily: "Permanent Marker",
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
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
