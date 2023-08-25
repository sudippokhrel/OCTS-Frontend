import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../components/context/UserAuthContext';
import { Alert } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc,  setDoc } from "firebase/firestore";
import { db } from '../../firebase-config';
import getColleges from '../../components/users/getColleges'; // Import the getColleges function
import { getPrograms } from '../../components/users/getPrograms';
import Autocomplete from '@mui/material/Autocomplete';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [puRegNumber, setPuRegNumber] = useState('');
  const [faculty, setFaculty] = useState('');
  const [college, setCollege] = useState('');
  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState('');
  const [semester, setSemester] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp,logIn,logOut} = useUserAuth();
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]); // State to store the colleges

  useEffect(() => {
    // Fetch colleges and programs from Firestore
    const fetchColleges = async () => {
      const fetchedColleges = await getColleges();
      console.log('Fetched colleges:', fetchedColleges);
      setColleges(fetchedColleges);
    };
    const fetchPrograms = async () => {
      const fetchedPrograms = await getPrograms();
      console.log('Fetched programs:', fetchedPrograms);
      setPrograms(fetchedPrograms);
    };

    fetchColleges();
    fetchPrograms();
  }, []);

  const faculties = ['Faculty of Science and Technology'];

  const handleProgramChange = (event, value) => {
    if (value) {
      setProgram(value.name);
    } else {
      setProgram('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { user: authUser } = await signUp(email, password);
      const userRef = doc(db, 'users', authUser.uid);
      await setDoc(userRef, {
        name: name,
        email: email,
        puRegNumber: puRegNumber,
        faculty: faculty,
        college: college,
        program: program,
        semester: semester,

        role: 'student'
      });

      console.log('Successfully created an account');
      toast.success('Successfully Created an account');

      // Explicitly sign out the user before redirecting to the login page
      await logOut(); 
      navigate('/login');

    } catch (error) {
      console.error('Error creating account:', error);
      setError('Invalid email or password');
      toast.error('Error creating an account. Please try again!');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={11} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '50px', backgroundColor: '#fff' }}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: '#1976d2' }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5" style={{ margin: '20px 0', color: '#1976d2' }}>
              SIGN UP
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: '20px', color: '#666' }}>
              Please fill this form to create an account!
            </Typography>
          </Grid>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            /><TextField
              variant="outlined"
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              variant="outlined"
              label="PU Registration Number"
              name="puRegNumber"
              fullWidth
              margin="normal"
              placeholder="PU Registration Number"
              onChange={(e) => setPuRegNumber(e.target.value)}
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Faculty</InputLabel>
              <Select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                label="Faculty"
              >
                <MenuItem value="">Select Faculty</MenuItem>
                {faculties.map((faculty) => (
                  <MenuItem key={faculty} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>College</InputLabel>
              <Select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                label="College"
              >
                <MenuItem value="">Select College</MenuItem>
                {colleges && colleges.length > 0 ? (
                  colleges.map((college) => (
                    <MenuItem key={college.id} value={college.collegeName}>
                      {college.collegeName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Loading colleges...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
            <Autocomplete
                fullWidth
                required
                options={programs}
                onChange={handleProgramChange}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Program" variant="outlined" />}
              />
            </FormControl>
            <TextField
              variant="outlined"
              label="Semester"
              name="semester"
              fullWidth
              margin="normal"
              placeholder="Semester"
              onChange={(e) => setSemester(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{ marginTop: '20px', backgroundColor: '#1976d2', color: '#fff' }}
            >
              Sign Up
            </Button>
            <div style={{ marginTop: '10px' }}>
              <Typography variant="caption">
                Already have an account?
                <Link to="/login" underline="hover">
                  Login
                </Link>
              </Typography>
            </div>
          </form>
        </Paper>
      </Grid>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </Grid>
  );
};

export default Signup;
