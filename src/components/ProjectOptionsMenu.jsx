import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ProjectOptionsMenu({ projectId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = (content) => {
    setModalContent(content);
    setModalOpen(true);
    handleClose(); // Close the menu when opening modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Modal style
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
  };

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
            handleModalOpen(`Details for Option 1 of project ${projectId}`)
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
            Project Details
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2, mb: 2 }}>
            {modalContent}
          </Typography>
          <Button onClick={handleModalClose} variant="contained" size="small">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ProjectOptionsMenu;
