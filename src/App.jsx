import * as React from "react";
import TasksMain from "./pages/TasksMain";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchOnWindowFocus: false,
  //     retry: false,
  //     staleTime: 1000 * 60 * 5, // 5 minutes
  //   },
  //   mutations: {
  //     retry: false,
  //   },
  // },
});

export default function App() {
  return (
    <AuthProvider>
      <ThemeModeProvider>
          <QueryClientProvider client={queryClient}>
            <TasksMain />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      </ThemeModeProvider>
    </AuthProvider>
  );
}
