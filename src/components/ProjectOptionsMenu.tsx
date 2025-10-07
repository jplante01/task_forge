import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useDeleteProjectById } from "../hooks/queries/projects";
import type { Database } from "../types/supabase";
import type { User } from "@supabase/supabase-js";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ProjectOptionsMenuProps {
  project: Project;
  user: User | null;
}

function ProjectOptionsMenu({ project, user }: ProjectOptionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const open = Boolean(anchorEl);

  const { mutate: deleteProjectById } = useDeleteProjectById();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = (content: string) => {
    setModalContent(content);
    setModalOpen(true);
    handleClose(); // Close the menu when opening modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!user) return;
    deleteProjectById({ projectId: project.id, userId: user.id });
    handleModalClose();
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  } as const;

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() =>
            handleModalOpen(
              `Are you sure you want to delete project "${project.name}"?`,
            )
          }
        >
          Delete Project
        </MenuItem>
      </Menu>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2, mb: 3 }}>
            {modalContent}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={handleModalClose} variant="outlined" size="small">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default ProjectOptionsMenu;
