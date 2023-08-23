import React from 'react';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { db } from '../../firebase-config';
import Swal from 'sweetalert2';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Role based edit and add option
import { useUserAuth } from '../../components/context/UserAuthContext';
import getUserRole from '../../components/users/getUserRole';

const EditSeats = ({fid, closeEditEvent }) => {

  const [College, setCollege] = useState('');
  const [Program, setProgram] = useState('');
  const [Semester, setSemester] = useState('');
  const [TotalSeats, setTotalSeats] = useState('');
  const [Seats, setSeats] = useState('');
  const [filledSeatsError, setFilledSeatsError] = useState(false);
  const [semesterError, setSemesterError] = useState(false);

  const {  user} = useUserAuth();//to display the profile bar according to user
  const [userRole, setUserRole] = React.useState(null);

  React.useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const role = await getUserRole(user.uid);
        setUserRole(role);
      }
    };

    fetchUserRole();
  }, [user]);


  useEffect(() => {
    console.log("FID: " + fid.id);
    // const selectedCollege = colleges.find(option => option.name === fid.College);
    // const selectedProgram = programs.find(option => option.name === fid.Program);
  
    setCollege(fid.College);
    setProgram(fid.Program);
    setSemester(fid.Semester);
    setTotalSeats(fid.TotalSeats);
    setSeats(fid.Seats);
  }, []);

  
  
  const handleCollegeChange =(event, value) => {
    if (userRole === 'admin') {
      setCollege(event.target.value);
    } else if (userRole === 'college_head' || userRole === 'program_coordinator' || userRole === 'dean' || userRole=='coordinator' || userRole=='director')  {
      setCollege(value.name);
    }
  };

  const handleProgramChange =(event, value) => {
    if (userRole === 'admin') {
      setProgram(event.target.value);
    } else if (userRole === 'college_head' || userRole === 'program_coordinator' || userRole === 'dean' || userRole=='coordinator' || userRole=='director')  {
      setProgram(value.name);
    }
  };

  const handleTotalSeatsChange =(event, value) => {
    if (userRole === 'admin') {
      setTotalSeats(event.target.value);
    } else if (userRole === 'college_head' || userRole === 'program_coordinator' || userRole === 'dean' || userRole=='coordinator' || userRole=='director')  {
      setTotalSeats(value.name);
    }
  };

  const handleSemesterChange = (event) => {
    const semesterValue = parseInt(event.target.value);
    if (!isNaN(semesterValue) && semesterValue >= 1 && semesterValue <= 8) {
      setSemester(semesterValue);
      setSemesterError(false);
    } else {
      setSemesterError(true);
    }
  };

  

  const handleSeatsChange =(event) => {
    const filledSeatsValue = parseInt(event.target.value);
  if (
    !isNaN(filledSeatsValue) &&
    filledSeatsValue >= 0 &&
    filledSeatsValue <= TotalSeats
  ) {
    setSeats(filledSeatsValue);
    setFilledSeatsError(false);
  } else {
    setFilledSeatsError(true);
  }
  };


  const handleEdit = async () => {
    const editedSeat ={
      College:College,
      Program: Program,
      Semester: Semester,
      TotalSeats:TotalSeats,
      Seats: Seats,
      
    };
    const seatDocRef = doc(db, "seats", fid.id);
    await updateDoc(seatDocRef, editedSeat);
    closeEditEvent();
    Swal.fire("submitted","Seat has been Edited","sucess")
    // Handle form submission logic here
  };


  return (
    <Box sx={{ p: 0 ,width: '100%' }}>
      <Typography variant="h5" align="center">
        Edit Seat Details
      </Typography>
      <IconButton
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEditEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ mt: 5 }}>
        <form onSubmit={handleEdit}>
          <Grid container spacing={3}>

          <Grid item xs={12}  >
              <TextField
                fullWidth
                required
                label="College"
                value={College}
                onChange={handleCollegeChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={7}>
              <TextField
                fullWidth
                required
                label="Program"
                value={Program}
                onChange={handleProgramChange}
                variant="outlined"
              />
            </Grid>
            

            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                required
                label="Semester"
                type='number'
                value={Semester}
                onChange={handleSemesterChange}
                variant="outlined"
                error={semesterError}
                helperText={
                semesterError ? "Semester must be between 1 and 8" : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                fullWidth
                required
                label="Total Seats"
                type='number'
                value={TotalSeats}
                onChange={handleTotalSeatsChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                fullWidth
                required
                label="Filled Seats"
                type='number'
                value={Seats}
                onChange={handleSeatsChange}
                variant="outlined"
                error={filledSeatsError}
                helperText={
                filledSeatsError ? "Filled Seats can be only between 0 and Total Seats" : ""
                }
              />
            </Grid>
            
            <Grid item xs={12} align="center">
              <Button  variant="contained" color="primary" onClick={handleEdit}>
                Edit College Seats
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

EditSeats.propTypes = {
  closeEditEvent: PropTypes.func.isRequired,
};

export default EditSeats;

