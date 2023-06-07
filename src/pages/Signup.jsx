import React from 'react';
import { Grid, Paper, TextField, Button, Avatar, Typography, MenuItem } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const paperStyle = {
    padding: '30px 20px',
    width: 300,
    margin: '20px auto',
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: 'blue' };
  const initialValues = {
    name: '',
    email: '',
    puRegistrationNumber: '',
    faculty: '',
    college: '',
    password: '',
    confirmPassword: '',
  };

  const textFieldStyle = {
    marginBottom: '10px',
  };

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
    email: Yup.string().email('Invalid Email').required('Required'),
    puRegistrationNumber: Yup.string().required('Required'),
    faculty: Yup.string().required('Required'),
    college: Yup.string().required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = (values, props) => {
    console.log(values);
    props.resetForm();
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account!
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                name="name"
                label="Name"
                placeholder="Enter your name"
                helperText={<ErrorMessage name="name" />}
                style={textFieldStyle}
              />
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                placeholder="Enter your Email"
                helperText={<ErrorMessage name="email" />}
                style={textFieldStyle}
              />
              <Field
                as={TextField}
                fullWidth
                name="puRegistrationNumber"
                label="PU-Registration number"
                placeholder="Enter your PU-registration number"
                helperText={<ErrorMessage name="puRegistrationNumber" />}
                style={textFieldStyle}
              />
              <Field
                as={TextField}
                fullWidth
                name="faculty"
                label="Faculty"
                placeholder="Select your Faculty"
                select
                helperText={<ErrorMessage name="faculty" />}
                style={textFieldStyle}
              >
                {faculties.map((faculty) => (
                  <MenuItem key={faculty} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </Field>

              <Field
                as={TextField}
                fullWidth
                name="college"
                label="College"
                placeholder="Select your College"
                select
                helperText={<ErrorMessage name="college" />}
                style={textFieldStyle}
              >
                {colleges.map((college) => (
                  <MenuItem key={college} value={college}>
                    {college}
                  </MenuItem>
                ))}
              </Field>

              <Field
                as={TextField}
                fullWidth
                name="password"
                label="Password"
                type="password"
                helperText={<ErrorMessage name="password" />}
                style={textFieldStyle}
              />
              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                helperText={<ErrorMessage name="confirmPassword" />}
                style={textFieldStyle}
              />
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;

