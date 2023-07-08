import React from 'react';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

const AddDirectors = ({ closeEvent }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const colleges = [
    { name: 'College A' },
    { name: 'College B' },
    { name: 'College C' },
    // Add more college options here
  ];

  return (
    <Box sx={{ p: 0 ,width: '100%' }}>
      <Typography variant="h5" align="center">
        Add Director
      </Typography>
      <IconButton
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ mt: 5 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                required
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={7} >
              <TextField
                fullWidth
                required
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}  >
              <Autocomplete
                fullWidth
                required
                options={colleges}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="College" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                fullWidth
                required
                label="Address"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="password"
                label="Password"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} align="center">
              <Button type="submit" variant="contained" color="primary">
                Add Director
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

AddDirectors.propTypes = {
  closeEvent: PropTypes.func.isRequired,
};

export default AddDirectors;
