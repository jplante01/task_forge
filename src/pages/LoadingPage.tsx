import { Backdrop, CircularProgress, Typography } from "@mui/material";

export default function LoadingPage() {
  return (
  <Backdrop
    sx={{
      color: "#fff",
      zIndex: (theme) => theme.zIndex.drawer + 1,
      flexDirection: "column",
      gap: 2,
    }}
    open={true}
  >
    <CircularProgress color="inherit" size={60} />
    <Typography variant="h6">Loading your tasks...</Typography>
  </Backdrop>
)};
