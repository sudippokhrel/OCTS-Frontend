import React from 'react';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Notification = ({ message, link }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <>
          {link && (
            <a href={link} style={{ color: 'white', textDecoration: 'underline' }}>
              View Details
            </a>
          )}
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

export default Notification;