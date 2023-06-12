import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';


const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (values) => {
    const { email, password } = values;

    signInWithEmailAndPassword(auth,email, password)
      .then((userCredential)=>{
      console.log('Logged in successfully!')
      console.log(userCredential)
      }).catch((error) =>{
      console.error('Error logging in:', error)
      setErrorMessage('Invalid email or password')
    })
  }

  const handleForgotPassword = async (values) => {
    const { email } = values;
    try {
      await sendPasswordResetEmail(auth,email);
      console.log('Password reset email sent!');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setErrorMessage('Failed to send password reset email');
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
  });

  return (
    <Grid container justifyContent="center" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
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
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ errors,values }) => (
              <Form>
                <Field
                  as={TextField}
                  variant="outlined"
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
                {errorMessage && (
                  <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
                    {errorMessage}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: '10px', backgroundColor: '#1976d2', color: '#fff' }}
                >
                  Login
                </Button>
                <div style={{ marginTop: '10px' }}>
                <Typography variant="caption">
                   Do not have an account?{' '}
                   <Link href="/signup" underline="hover">
                      Sign up
                   </Link>
                </Typography>
                </div>
                <div style={{ marginTop: '10px' }}>
                <Typography variant="caption">
                  <Link onClick={() => handleForgotPassword(values)} underline="hover" color="primary">
                    Forgot Password?
                  </Link>
                </Typography>
                </div>

              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;






/*const handleLogin = async (values) => {
  const { email, password } = values;

  try {
    await signInWithEmailAndPassword(auth,email, password);
    console.log('Logged in successfully!');
  } catch (error) {
    console.error('Error logging in:', error);
    setErrorMessage('Invalid email or password');
  }*/