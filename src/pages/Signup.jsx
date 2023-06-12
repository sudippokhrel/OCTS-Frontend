import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Grid, Paper, Avatar, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; // Assuming you have the Firebase config and auth instance in a separate file

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const faculties = [
    'Faculty of Science and Technology',
  ];

  const colleges = [
    'School of Engineering, Pokhara Lekhnath-30,Kaski',
    'Madan Bhandari Memorial Academy Nepal, Urlabari-3, Morang',
    'Nepal Engineering College, Changunarayan, Bhaktapur',
    'School of Environmental Science & management (SchEMS), Mid Baneshwor,Kathmandu',
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    puRegNumber: Yup.string().required('Required'),
    faculty: Yup.string().required('Required'),
    college: Yup.string().required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = async (values) => {
    const { name, email, puRegNumber, faculty, college, password } = values;

      createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential)=>{
        console.log('Created successfully!')
        console.log(userCredential)
        }).catch((error) =>{
        console.error('Error creating account:', error)
        setErrorMessage('Invalid email or password')
      })
    }

  return (
    <Grid container justifyContent="center" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
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
          <Formik
            initialValues={{
              name: '',
              email: '',
              puRegNumber: '',
              faculty: '',
              college: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
          {({ errors}) => (
            <Form>
              <Field
                as={TextField}
                variant="outlined"
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
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
                label="PU Registration Number"
                name="puRegNumber"
                fullWidth
                margin="normal"
                error={Boolean(errors.puRegNumber)}
                helperText={errors.puRegNumber}
              />
              <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Faculty</InputLabel>
              <Field as={Select} name="faculty" label="Faculty" error={Boolean(errors.faculty)}>
                <MenuItem value="">Select Faculty</MenuItem>
                {faculties.map((faculty) => (
                  <MenuItem key={faculty} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>College</InputLabel>
              <Field as={Select} name="college" label="College" error={Boolean(errors.college)}>
                <MenuItem value="">Select College</MenuItem>
                {colleges.map((college) => (
                  <MenuItem key={college} value={college}>
                    {college}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
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
              <Field
                as={TextField}
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                margin="normal"
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
              {errorMessage && (
                <Typography variant="body2" color="error" align="center" style={{ marginTop: '10px' }}>
                  {errorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ marginTop: '20px', backgroundColor: '#1976d2', color: '#fff' }}
              >
                Sign Up
              </Button>
            </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Signup;



