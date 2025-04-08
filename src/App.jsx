import * as React from 'react';
import TasksMain from './pages/TasksMain';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <TasksMain />
    </ThemeProvider>
  );
}
