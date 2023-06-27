import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../components/context/UserAuthContext';
import { Alert } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [puRegNumber, setPuRegNumber] = useState('');
  const [faculty, setFaculty] = useState('');
  const [college, setCollege] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const faculties = ['Faculty of Science and Technology'];

  const colleges = [
    'School of Engineering, Pokhara Lekhnath-30, Kaski',
    'Madan Bhandari Memorial Academy Nepal, Urlabari-3, Morang',
    'Nepal Engineering College, Changunarayan, Bhaktapur',
    'School of Environmental Science & Management (SchEMS), Mid Baneshwor, Kathmandu',
    'Gandaki College of Engineering and Science, Lamachaur, Pokhara-16, Kaski',
    'Pokhara Engineering College, Phirke, Pokhara, Kaski',
    'Universal Engineering College, Chakupat, Lalitpur',
    'Crimson College of Technology, Devinagar, Rupandehi',
    'Oxford College of Engineering and Management, Gaidakot, Nawalparasi',
    'Lumbini Engineering, Management and Science College, Bhalwari, Butwal, Rupandehi',
    'National Academy of Science and Technology Dhangadi, Kailali',
    'Nepal College of Information Technology, Balkumari, Lalitpur',
    'Cosmos College of Management and Technology, Tutepani-14, Lalitpur',
    'Everest Engineering College, Sanepa-2, Lalitpur',
    'Rapti Engineering College, Ghorahi-01, Saniambapur, Dang',
    'United Technical College, Bharatpur-11, Chitwan',
    'College of Engineering & Management, Nepalgung, Banke',
    'LA Grande International College, Simalchaur, Pokhara, Kaski',
    'Citizen College, Satdobato, Lalitpur',
    'Ritz College of Engineering and Management, Balkumari, Lalitpur',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signUp(email, password);
      console.log('Successfully created an account');
      toast.success('Successfully Created an account'); 
      navigate('/login');
    } catch (error) {
      console.error('Error creating account:', error);
      setError('Invalid email or password');
      toast.error('Error creating an account. Please try again!')
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
            />
            <TextField
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
                {colleges.map((college) => (
                  <MenuItem key={college} value={college}>
                    {college}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
