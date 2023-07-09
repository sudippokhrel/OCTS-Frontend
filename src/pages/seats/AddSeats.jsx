import React, {useEffect} from 'react';
import { useState } from 'react';
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

import getColleges from '../../components/users/getColleges';
import {getPrograms} from '../../components/users/getPrograms';
import getSemesters from '../../components/users/getSemesters';

const AddSeats = ({ closeEvent }) => {
  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [college, setCollege] = useState('');
  const [program, setProgram] = useState('');
  const [semester, setSemester] = useState('');
  const [seats, setSeats] = useState('');
  const empCollectionRef = collection(db, 'seats');

  useEffect(() => {
    const fetchCollegesAndPrograms = async () => {
      const fetchedColleges = await getColleges();
      console.log('Fetched colleges:', fetchedColleges);

      const fetchedPrograms = await getPrograms();
      console.log('Fetched programs:', fetchedPrograms);


      setColleges(fetchedColleges || []);
      setPrograms(fetchedPrograms || []);
    };

    fetchCollegesAndPrograms();
  }, []);


  const handleCollegeChange = (event, value) => {
    if (value) {
      setCollege(value.collegeName);
    } else {
      setCollege('');
    }
  };

  const handleProgramChange = (event, value) => {
    if (value) {
      setProgram(value.name);
    } else {
      setProgram('');
    }
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleSeatsChange = (event) => {
    setSeats(event.target.value);
  };

  const handleSubmit = async () => {
    const newSeat = {
      College: college,
      Program: program,
      Semester: semester,
      Seats: seats,
    };
    await addDoc(empCollectionRef, newSeat);
    closeEvent(newSeat);
    Swal.fire('Submitted', 'Your File has been Submitted', 'success');
    // Handle form submission logic here
  };

  return (
    <Box sx={{ p: 0, width: '100%' }}>
      <Typography variant="h5" align="center">
        Add Seats
      </Typography>
      <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Box sx={{ mt: 5 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                required
                options={colleges}
                getOptionLabel={(option) => option.collegeName}
                onChange={handleCollegeChange}
                renderInput={(params) => <TextField {...params} label="College" variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                required
                options={programs}
                onChange={handleProgramChange}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Programs" variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                required
                label="Semester"
                type="number"
                value={semester}
                onChange={handleSemesterChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                fullWidth
                required
                label="Seats"
                type="number"
                value={seats}
                onChange={handleSeatsChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add College Seats
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

AddSeats.propTypes = {
  closeEvent: PropTypes.func.isRequired,
};

export default AddSeats;
