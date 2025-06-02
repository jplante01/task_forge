import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TasksMain from "./pages/TasksMain";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      // retry: false,
    },
  },
});

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeModeProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <TasksMain />
                  </ProtectedRoute>
                }
              />
              {/* Add more protected routes as needed */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeModeProvider>
      </AuthProvider>
    </Router>
  );
}
