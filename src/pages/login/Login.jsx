import React, { useState } from 'react';
import { auth } from '../../firebase-config';
import { Alert } from '@mui/material';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../components/context/UserAuthContext';
import getUserRole from '../../components/users/getUserRole';

const Login = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      console.log('Logged in successfully!');
      toast.success('Login successful!'); 
      
       // Retrieve the user's role from Firestore
       const user = auth.currentUser;
       const role = await getUserRole(user.uid);
       console.log('User role:', role); // Log the user's role to the console

        // Redirect the user to their respective dashboard based on the role
      if (role === 'college_head' || role== 'director') {
        navigate('/');
      }else if (role === 'program_coordinator' || role== 'coordinator') {
        navigate('/');
      } 
      else if (role === 'admin'|| role =='dean') {
        navigate('/seats');
      } else if (role === 'student') {
        navigate('/');
      }
      
      
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password');
      toast.error("Invalid email or password!")
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent!');
      toast.success("Please check your email for password reset")
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError('Please enter your email first to reset the password.');
      toast.error('Error sending password reset email');
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
              LOGIN
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: '20px', color: '#666' }}>
              Please fill this form to login!
            </Typography>
          </Grid>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <form onSubmit={handleLogin} style={{ marginTop: '2rem' }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  type="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: '100%' }}

                  />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" type="submit" fullWidth>
                  Log In
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body2" align="center">
                  <Link component={RouterLink} to="#" onClick={handleForgotPassword}>
                    Forgot Password?
                  </Link>
                </Typography>
              </Grid>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
               Don't have an account? <Link component={RouterLink} to="/signup">Sign up</Link>
              </Typography>
            </Grid>
          </form>
          
        </Paper>
      </Grid>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </Grid>
  );
};

export default Login;
