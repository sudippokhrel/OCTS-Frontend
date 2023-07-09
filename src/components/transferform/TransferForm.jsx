import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  TextField, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Box,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import getColleges from '../users/getColleges';
import { getPrograms } from '../users/getPrograms';

const TransferForm = () => {
  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);

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

  const initialValues = {
    fullName: '',
    registrationNumber: '',
    examRollNumber: '',
    sourceCollegeName: '',
    destinationCollegeName: '',
    email: '',
    contactNumber: '',
    programEnrolled: '',
    currentSemester: '',
    gradeSheet: null,
    remarks: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    registrationNumber: Yup.string().required('Registration Number is required'),
    examRollNumber: Yup.number().required('Exam Roll Number is required'),
    sourceCollegeName: Yup.string().required('Source College Name is required'),
    destinationCollegeName: Yup.string()
      .notOneOf([Yup.ref('sourceCollegeName')], 'Destination College cannot be the same as Source College')
      .required('Destination College Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    contactNumber: Yup.string()
      .matches(/^(?:\+977|0)[7-9]\d{8}$/, 'Invalid phone number')
      .required('Contact Number is required'),
    programEnrolled: Yup.string().required('Program Enrolled is required'),
    currentSemester: Yup.string().required('Current Semester is required'),
    gradeSheet: Yup.mixed().required('Grade Sheet is required'),
    remarks: Yup.string().required('Remarks is required'),
  });

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <Container maxWidth="full">
      <Typography variant="h4" align="center" gutterBottom>
        Apply for College Transfer
      </Typography>
      <Box sx={{ bgcolor: '#f5f5f5', padding: '1rem', borderRadius: '0.5rem' }}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Field
              as={TextField}
              required
              fullWidth
              label="Full Name"
              name="fullName"
              margin="normal"
            />
            <ErrorMessage name="fullName" component="div" className="error-red" />

            <Field
              as={TextField}
              required
              fullWidth
              label="Registration Number"
              name="registrationNumber"
              margin="normal"
            />
            <ErrorMessage name="registrationNumber" component="div" className="error-red" />

            <Field
              as={TextField}
              required
              fullWidth
              label="Examination Roll Number"
              name="examRollNumber"
              margin="normal"
            />
            <ErrorMessage name="examRollNumber" component="div" className="error-red" />

            <FormControl fullWidth margin="normal">
              <InputLabel>Source College Name</InputLabel>
              <Field as={Select} name="sourceCollegeName" required>
                <MenuItem value="">Select Source College</MenuItem>
                {colleges.map((college) => (
                  <MenuItem key={college.id} value={college.id}>
                    {college.collegeName}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="sourceCollegeName" component="div" className="error-red" />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Destination College Name</InputLabel>
              <Field as={Select} name="destinationCollegeName" required>
                <MenuItem value="">Select Destination College</MenuItem>
                {colleges.map((college) => (
                  <MenuItem key={college.id} value={college.id}>
                    {college.collegeName}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="destinationCollegeName" component="div" className="error-red" />
            </FormControl>

            <Field
              as={TextField}
              required
              fullWidth
              label="Email"
              name="email"
              margin="normal"
            />
            <ErrorMessage name="email" component="div" className="error-red" />

            <Field
              as={TextField}
              required
              fullWidth
              label="Contact Number"
              name="contactNumber"
              margin="normal"
            />
            <ErrorMessage name="contactNumber" component="div" className="error-red" />

            <FormControl fullWidth margin="normal">
              <InputLabel>Program Enrolled</InputLabel>
              <Field as={Select} name="programEnrolled" required>
                <MenuItem value="">Select Program Enrolled</MenuItem>
                {programs.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.name}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="programEnrolled" component="div" className="error-red" />
            </FormControl>

            <Field
              as={TextField}
              required
              fullWidth
              label="Current Semester"
              name="currentSemester"
              margin="normal"
            />
            <ErrorMessage name="currentSemester" component="div" className="error-red" />

            <input
              type="file"
              accept=".pdf"
              onChange={(event) => {
                const file = event.target.files[0];
                const fieldName = event.target.name;
                const setFieldValue = event.target.form.setFieldValue;
                setFieldValue(fieldName, file);
              }}
              style={{ marginBottom: '1rem' }}
              name="gradeSheet"
            />
            <ErrorMessage name="gradeSheet" component="div" className="error-red" />

            <Field
              as={TextField}
              required
              fullWidth
              multiline
              label="Remarks (Reason for Transfer)"
              name="remarks"
              margin="normal"
            />
            <ErrorMessage name="remarks" component="div" className="error-red" />

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default TransferForm;
