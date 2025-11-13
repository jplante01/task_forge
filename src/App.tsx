import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import LoadingPage from "./pages/LoadingPage";

const TasksMain = React.lazy(() => import("./pages/TasksMain"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ThemeModeProvider>
            <NotificationProvider>
              <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/auth/reset-password" element={<ResetPassword />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <React.Suspense fallback={<LoadingPage />}>
                          <TasksMain />
                        </React.Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </NotificationProvider>
          </ThemeModeProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}
