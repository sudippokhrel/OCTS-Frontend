// import React from 'react';
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

const TransferForm = () => {
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
            <ErrorMessage name="fullName" component="div" className="error" />

            <Field
              as={TextField}
              required
              fullWidth
              label="Registration Number"
              name="registrationNumber"
              margin="normal"
            />
            <ErrorMessage name="registrationNumber" component="div" className="error" />

            <Field
              as={TextField}
              required
              fullWidth
              label="Examination Roll Number"
              name="examRollNumber"
              margin="normal"
            />
            <ErrorMessage name="examRollNumber" component="div" className="error" />

            <FormControl fullWidth margin="normal">
              <InputLabel>Source College Name</InputLabel>
              <Field as={Select} name="sourceCollegeName" required>
                <MenuItem value="">Select Source College</MenuItem>
                <MenuItem value="School of Engineering">School of Engineering</MenuItem>
                <MenuItem value="Madan Bhandari Memorial Academy Nepal">Madan Bhandari Memorial Academy Nepal</MenuItem>
                <MenuItem value="Nepal Engineering College">Nepal Engineering College</MenuItem>
                <MenuItem value="Gandaki College of Engineering and Science">Gandaki College of Engineering and Science</MenuItem>
                <MenuItem value="Pokhara Engineering College">Pokhara Engineering College</MenuItem>
                <MenuItem value="Lumbini Engineering, Management and Science College">Lumbini Engineering, Management and Science College</MenuItem>
                <MenuItem value="Rapti Engineering College">Rapti Engineering College</MenuItem>
                <MenuItem value="United Technical College">United Technical College</MenuItem>
                <MenuItem value="College of Engineering & Management">College of Engineering & Management</MenuItem>
                <MenuItem value="Universal Engineering & Science College">Universal Engineering & Science College</MenuItem>
                <MenuItem value="School of Environmental Science and Management (SchEMS)">School of Environmental Science and Management (SchEMS)</MenuItem>
                <MenuItem value="Crimson College of Technology">Crimson College of Technology</MenuItem>
                <MenuItem value="Oxford College of Engineering and Management">Oxford College of Engineering and Management</MenuItem>
                <MenuItem value="National Academy of Science &Technology">National Academy of Science &Technology</MenuItem>
                <MenuItem value="Nepal College of Information Technology">Nepal College of Information Technology</MenuItem>
                <MenuItem value="Cosmos College of Management and Technology">Cosmos College of Management and Technology</MenuItem>
                <MenuItem value="Everest Engineering College">Everest Engineering College</MenuItem>
                <MenuItem value="LA Grande International College">LA Grande International College</MenuItem>
                <MenuItem value="Citizen College">Citizen College</MenuItem>
                <MenuItem value="Tillottama College">Tillottama College</MenuItem>
                <MenuItem value="Ritz College of Engineering and Management">Ritz College of Engineering and Management</MenuItem>
              </Field>
              <ErrorMessage name="sourceCollegeName" component="div" className="error" />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Destination College Name</InputLabel>
              <Field as={Select} name="destinationCollegeName" required>
                <MenuItem value="">Select Destination College</MenuItem>
                <MenuItem value="School of Engineering">School of Engineering</MenuItem>
                <MenuItem value="Madan Bhandari Memorial Academy Nepal">Madan Bhandari Memorial Academy Nepal</MenuItem>
                <MenuItem value="Nepal Engineering College">Nepal Engineering College</MenuItem>
                <MenuItem value="Gandaki College of Engineering and Science">Gandaki College of Engineering and Science</MenuItem>
                <MenuItem value="Pokhara Engineering College">Pokhara Engineering College</MenuItem>
                <MenuItem value="Lumbini Engineering, Management and Science College">Lumbini Engineering, Management and Science College</MenuItem>
                <MenuItem value="Rapti Engineering College">Rapti Engineering College</MenuItem>
                <MenuItem value="United Technical College">United Technical College</MenuItem>
                <MenuItem value="College of Engineering & Management">College of Engineering & Management</MenuItem>
                <MenuItem value="Universal Engineering & Science College">Universal Engineering & Science College</MenuItem>
                <MenuItem value="School of Environmental Science and Management (SchEMS)">School of Environmental Science and Management (SchEMS)</MenuItem>
                <MenuItem value="Crimson College of Technology">Crimson College of Technology</MenuItem>
                <MenuItem value="Oxford College of Engineering and Management">Oxford College of Engineering and Management</MenuItem>
                <MenuItem value="National Academy of Science &Technology">National Academy of Science &Technology</MenuItem>
                <MenuItem value="Nepal College of Information Technology">Nepal College of Information Technology</MenuItem>
                <MenuItem value="Cosmos College of Management and Technology">Cosmos College of Management and Technology</MenuItem>
                <MenuItem value="Everest Engineering College">Everest Engineering College</MenuItem>
                <MenuItem value="LA Grande International College">LA Grande International College</MenuItem>
                <MenuItem value="Citizen College">Citizen College</MenuItem>
                <MenuItem value="Tillottama College">Tillottama College</MenuItem>
                <MenuItem value="Ritz College of Engineering and Management">Ritz College of Engineering and Management</MenuItem>
              </Field>
              <ErrorMessage name="destinationCollegeName" component="div" className="error" />
            </FormControl>

            <Field
              as={TextField}
              required
              fullWidth
              label="Email"
              name="email"
              margin="normal"
            />
            <ErrorMessage name="email" component="div" className="error" />

            <Field
              as={TextField}
              required
              fullWidth
              label="Contact Number"
              name="contactNumber"
              margin="normal"
            />
            <ErrorMessage name="contactNumber" component="div" className="error" />

            <FormControl fullWidth margin="normal">
              <InputLabel>Program Enrolled</InputLabel>
              <Field as={Select} name="programEnrolled" required>
                <MenuItem value="">Select Program Enrolled</MenuItem>
                <MenuItem value="Bachelor of Civil Engineering">Bachelor of Civil Engineering</MenuItem>
                <MenuItem value="Bachelor of Civil & Rural Engineering">Bachelor of Civil & Rural Engineering</MenuItem>
                <MenuItem value="Bachelor of Civil Engineering for Diploma Holders">Bachelor of Civil Engineering for Diploma Holders</MenuItem>
                <MenuItem value="Bachelor of Electrical and Electronics Engineering">Bachelor of Electrical and Electronics Engineering</MenuItem>
                <MenuItem value="Bachelor of Electronics & Communication Engineering">Bachelor of Electronics & Communication Engineering</MenuItem>
                <MenuItem value="Bachelor of Computer Engineering">Bachelor of Computer Engineering</MenuItem>
                <MenuItem value="Bachelor of Engineering in Information Technology">Bachelor of Engineering in Information Technology</MenuItem>
                <MenuItem value="Bachelor of Software Engineering">Bachelor of Software Engineering</MenuItem>
                <MenuItem value="Bachelor of Architecture">Bachelor of Architecture</MenuItem>
                <MenuItem value="Bachelor of Science in Environmental Management">Bachelor of Science in Environmental Management</MenuItem>
                <MenuItem value="Bachelor of Computer Application">Bachelor of Computer Application</MenuItem>
                
              </Field>
              <ErrorMessage name="programEnrolled" component="div" className="error" />
            </FormControl>

            <Field
              as={TextField}
              required
              fullWidth
              label="Current Semester"
              name="currentSemester"
              margin="normal"
            />
            <ErrorMessage name="currentSemester" component="div" className="error" />

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
            <ErrorMessage name="gradeSheet" component="div" className="error" />

            <Field
              as={TextField}
              required
              fullWidth
              multiline
              label="Remarks (Reason for Transfer)"
              name="remarks"
              margin="normal"
            />
            <ErrorMessage name="remarks" component="div" className="error" />

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