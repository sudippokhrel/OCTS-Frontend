import React from 'react'
import { useState } from 'react';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import Box from "@mui/system/Box";
import { Grid, Paper, Avatar, TextField, Button, Typography, Snackbar } from '@mui/material';
import { useUserAuth } from '../../components/context/UserAuthContext';

const PasswordUpdate = () => {
  const { user } = useUserAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleChangePassword = () => {

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password don't match.");
      setSuccessMessage('');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email,currentPassword);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            console.log('Password updated!');
            setSuccessMessage('Password updated successfully.');
            setError('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
          })
          .catch((error) => {
            console.log(error);
            setError(error.message || 'An error occurred while updating password.');
          });
      })
      .catch((error) => {
        console.log(error);
        setError('Authentication failed. Please check your current password.');
      });
  };

  return (
    <Box
      sx={{
        width: 450,
        backgroundColor: 'white',
        border: 'white',
        padding: 5,
        fontSize: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        borderRadius: 0,
        textAlign: 'left',
        boxShadow: 3,
      }}
    >
    <div>
    <Typography variant="h6" gutterBottom>
      Change Password
    </Typography>
    <Typography color="error">{error}</Typography>
        <Typography style={{ color: 'green' }}>{successMessage}</Typography>
    <TextField
      label="Current Password"
      type="password"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      fullWidth
      margin="normal"
    />
    <TextField
      label="New Password"
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Confirm New Password"
      type="password"
      value={confirmNewPassword}
      onChange={(e) => setConfirmNewPassword(e.target.value)}
      fullWidth
      margin="normal"
    />
    <Button variant="contained" onClick={handleChangePassword} fullWidth>
      Change Password
    </Button>
  </div>
</Box>
);
};

export default PasswordUpdate;