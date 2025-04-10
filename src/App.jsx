import * as React from 'react';
import TasksMain from './pages/TasksMain';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <TasksMain />
    </ThemeProvider>
  );
}
