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

const EditSeats = ({fid, closeEditEvent }) => {

  const [College, setCollege] = useState('');
  const [Program, setProgram] = useState('');
  const [Semester, setSemester] = useState('');
  const [TotalSeats, setTotalSeats] = useState('');
  const [Seats, setSeats] = useState('');
  const empCollectionRef = collection(db, "seats");


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
    setCollege(value.name)
  };

  const handleProgramChange =(event, value) => {
    if (value) {
      setProgram(value.name);
    } else {
      setProgram("");
    }
  };

  const handleSemesterChange =(event) => {
    setSemester(event.target.value)
  };

  const handleTotalSeatsChange =(event) => {
    setTotalSeats(event.target.value)
  };

  const handleSeatsChange =(event) => {
    setSeats(event.target.value)
  };


  const handleSubmit = async () => {
    const newSeat ={
      College:College,
      Program: Program,
      Semester: Semester,
      TotalSeats:TotalSeats,
      Seats: Seats,
      
    };
    await addDoc(empCollectionRef,newSeat);
    closeEditEvent(newSeat);
    Swal.fire("submitted","Your File has been Submitted","sucess")
    // Handle form submission logic here
  };


  const colleges = [
    { name: 'School of Engineering' },
    { name: 'Pokhara Engineering College' },
    { name: 'Nepal Engineering College' },
    // Add more college options here
  ];
  const programs=[
    {name:'BE Computer'},
    {name:'BE Software'},
    {name:'BE Civil'},
    {name:'BE Electrical'},
  ];

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
        <form onSubmit={handleSubmit}>
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
                onChange={handleSemesterChange}
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
              />
            </Grid>
            
            <Grid item xs={12} align="center">
              <Button  variant="contained" color="primary" onClick={handleSubmit}>
                Add College Seats
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

