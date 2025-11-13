import * as React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child component tree.
 * Displays a fallback UI instead of crashing the entire application.
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details for debugging
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    this.setState({
      errorInfo,
    });

    // TODO: Log to error reporting service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback provided by parent
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return <ErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  resetError: () => void;
}

/**
 * Default fallback UI component displayed when an error is caught
 */
function ErrorFallback({ error, errorInfo, resetError }: ErrorFallbackProps) {
  const isDevelopment = import.meta.env.DEV;

  const handleReload = () => {
    resetError();
    window.location.reload();
  };

  const handleGoHome = () => {
    resetError();
    // Use window.location instead of navigate to avoid hook dependency
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 3,
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={3} maxWidth="600px" textAlign="center">
        <Typography variant="h4" component="h1" color="error" fontWeight="bold">
          Oops! Something went wrong
        </Typography>

        <Typography variant="body1" color="text.secondary">
          We&apos;re sorry for the inconvenience. An unexpected error occurred and we couldn&apos;t process your request.
        </Typography>

        {isDevelopment && error && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "grey.100",
              borderRadius: 1,
              textAlign: "left",
              overflow: "auto",
              maxHeight: "200px",
            }}
          >
            <Typography variant="body2" component="pre" fontFamily="monospace" fontSize="12px">
              <strong>Error:</strong> {error.toString()}
            </Typography>
            {errorInfo && (
              <Typography variant="body2" component="pre" fontFamily="monospace" fontSize="12px" sx={{ mt: 1 }}>
                <strong>Component Stack:</strong>
                {errorInfo.componentStack}
              </Typography>
            )}
          </Box>
        )}

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleReload}>
            Reload Page
          </Button>
          <Button variant="outlined" color="primary" onClick={handleGoHome}>
            Go Home
          </Button>
        </Stack>

        {!isDevelopment && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
            If this problem persists, please contact support.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default ErrorBoundary;
