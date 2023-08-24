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
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Alert } from '@mui/material';
import { useUserAuth } from '../../components/context/UserAuthContext';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from '../../firebase-config';
import getColleges from '../../components/users/getColleges';
import {getPrograms} from '../../components/users/getPrograms';


const AddCoordinators = ({ closeEvent }) => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [collegeName, setCollegeName] = useState(null);
  const [address, setAddress] = useState('');
  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp, logIn } = useUserAuth();

  const empCollectionRef = collection(db, 'users');

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

  useEffect(() => {
    if (selectedCollege) {
      setAddress(selectedCollege.collegeAddress);
      setCollegeName(selectedCollege.collegeName);
    } else {
      setAddress('');
    }
  }, [selectedCollege]);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setError('');

    try {
      const { user: authUser } = await signUp(email, password);
      const userRef = doc(db, 'users', authUser.uid);
      const newUser = {
        name: name,
        email: email,
        college: collegeName,
        program: program,
        role: 'program_coordinator',

      };
      await setDoc(userRef, newUser);

      console.log('Successfully created an account');
      toast.success('Successfully Created an account');
      closeEvent(newUser);
      Swal.fire('Submitted', ' New Coordinator has been Added', 'success');
    } 
    catch (error) {
      console.error('Error creating account:', error);
      setError('Invalid email or password');
      toast.error('Error creating an account. Please try again!');
    }
  
    // Handle form submission logic here
  };

  const handleCollegeChange = (event, value) => {
    setSelectedCollege(value);
  };

  const handleProgramChange = (event, value) => {
    if (value) {
      setProgram(value.name);
    } else {
      setProgram('');
    }
  };

  return (
    <Box sx={{ p: 0 ,width: '100%' }}>
      <Typography variant="h5" align="center">
        Add Coordinator
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
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={7} >
              <TextField
                fullWidth
                required
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}  >
            <Autocomplete
            fullWidth
            required
            options={colleges}
            getOptionLabel={(option) => option.collegeName}
            value={selectedCollege}
            onChange={handleCollegeChange}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}  >
              <Autocomplete
                fullWidth
                required
                options={programs}
                onChange={handleProgramChange}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Programs" variant="outlined" />}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button type="submit" variant="contained" color="primary">
                Add Coordinator
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

AddCoordinators.propTypes = {
  closeEvent: PropTypes.func.isRequired,
};

export default AddCoordinators;
