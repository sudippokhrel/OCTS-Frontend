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
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // Import Alert component
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import getColleges from '../users/getColleges';
import { getPrograms } from '../users/getPrograms';
import ApplicationLetterPDF from '../../../pdf/FinalApplicationTemplate _fillable.pdf'
import { storage } from '../../firebase-config';
import { uploadBytes, ref } from 'firebase/storage';
import {  getDownloadURL } from '@firebase/storage';
import { collection, query,where,getDoc, addDoc,doc } from '@firebase/firestore';
import { db } from '../../firebase-config';
import { useUserAuth } from '../context/UserAuthContext';

const TransferForm = () => {

  const { user } = useUserAuth(); // Access the user details from your context or hook

  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  // State for user data
  const [userData, setUserData] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  const handleSuccess = () => {
    setSuccessOpen(true);
  };

  const handleError = () => {
    setErrorOpen(true);
  };

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid); // Adjust the collection name and path if necessary
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCollegesAndPrograms = async () => {
      const fetchedColleges = await getColleges();
      console.log('Fetched colleges:', fetchedColleges);

      const fetchedPrograms = await getPrograms();
      console.log('Fetched programs:', fetchedPrograms);

      setColleges(fetchedColleges || []);
      setPrograms(fetchedPrograms || []);
    };

    fetchCollegesAndPrograms();
    fetchUserData();
  }, [user.uid]);

  const initialValues = {
    name: userData?.name || '',
    puRegNumber: userData?.puRegNumber ||  '',
    examRollNumber: '',
    sourceCollegeName: '',
    destinationCollegeName: '',
    email:user.email ||'',
    contactNumber: '',
    program: '',
    semester: userData?.semester || '',
    ApplicationLetter: null,
    remarks: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    puRegNumber: Yup.string().required('Registration Number is required'),
    examRollNumber: Yup.number().required('Exam Roll Number is required'),
    sourceCollegeName: Yup.string().required('Source College Name is required'),
    destinationCollegeName: Yup.string()
      .notOneOf([Yup.ref('sourceCollegeName')], 'Destination College cannot be the same as Source College')
      .required('Destination College Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    contactNumber: Yup.number()
      .required('Contact Number is required'),
    program: Yup.string().required('Program Enrolled is required'),
    semester: Yup.string().required('Current Semester is required'),
    ApplicationLetter: Yup.mixed().required('Application Letter is required').test(
      'fileFormat',
      'Invalid file format. Please upload a PDF file.',
      (value) => value && value.type === 'application/pdf'
    ),
    remarks: Yup.string().required('Remarks is required'),
  });

  const handleSubmit = async(values,{ resetForm }) => {
    try {
      // Upload the edited PDF file (Application Letter)
      const file = values.ApplicationLetter;
      const storageRef = ref(storage, 'edited-pdfs/' + file.name);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

       // Add transfer application to Firestore collection
       const transferApplicationData = {
        name: values.name,
        puRegNumber: values.puRegNumber,
        examRollNumber: values.examRollNumber,
        sourceCollegeName: values.sourceCollegeName,
        destinationCollegeName: values.destinationCollegeName,
        email: values.email,
        contactNumber: values.contactNumber,
        program: values.program,
        semester: values.semester,
        ApplicationLetterPath: downloadURL, // Update this to the correct field name
        remarks: values.remarks,
        sourceCollegeStatus: 'Pending Source College Approval', // Initial status
        destinationCollegeStatus: 'Pending Destination College Approval',
        deanStatus: 'Pending Dean Approval'
      
      };

      const transferApplicationsCollection = collection(db, 'TransferApplications');
      await addDoc(transferApplicationsCollection, transferApplicationData);

  
      // Handle other form submissions here


      console.log(values);
      console.log('Transfer application submitted:', transferApplicationData);
      handleSuccess();
      resetForm();
    } catch (error) {
      console.error('Error uploading transfer application:', error);
      handleError();
    }

  };

  return (
    <Container maxWidth="full">
      <Typography variant="h4" align="center" gutterBottom>
        Apply for College Transfer
      </Typography>
      <Box sx={{ bgcolor: '#f5f5f5', padding: '1rem', borderRadius: '0.5rem' }}>
      <Typography variant="subtitle2" align="justify" fontStyle="italic" gutterBottom>
        Please fill in all the required fields in the form below. After completing the form, you can download the application letter template using the link provided. Write a similar letter and upload it along with your most recent semester gradesheet. If the gradesheet is not available, 
        provide relevant document that shows the proof that you had appeared in at least one examination of the last semester. Upload the documents in a SINGLE PDF.
        </Typography>
      <Typography variant="subtitle2" align="center" gutterBottom>
        <a href={ApplicationLetterPDF} download>
          Download Application Letter Template
        </a>
      </Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, errors, setFieldValue }) => (
      <Form>
          <Field
            as={TextField}
            required
            fullWidth
            label="Full Name"
            value={initialValues.name}
            name="name"
            margin="normal"
          />
          <ErrorMessage name="name" component="div" className="error-red" />

          <Field
            as={TextField}
            required
            fullWidth
            label="Registration Number"
            name="puRegNumber"
            value={initialValues.puRegNumber}
            margin="normal"
          />
          <ErrorMessage name="puRegNumber" component="div" className="error-red" />

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
                <MenuItem key={college.id} value={college.collegeName}>
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
                <MenuItem key={college.id} value={college.collegeName}>
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
            <Field as={Select} name="program" required>
              <MenuItem value="">Select Program Enrolled</MenuItem>
              {programs.map((program) => (
                <MenuItem key={program.id} value={program.name}>
                  {program.name}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage name="program" component="div" className="error-red" />
          </FormControl>

          <Field
            as={TextField}
            required
            fullWidth
            label="Current Semester"
            name="semester"
            value={initialValues.semester}
            margin="normal"
          />
          <ErrorMessage name="semester" component="div" className="error-red" />

          <Field name="ApplicationLetter">
          {({ form }) => (
          <FormControl fullWidth margin="normal">
            <span className="upload-info">
              <Typography variant="subtitle2" align="justify" fontStyle="italic" gutterBottom>
                Upload your single pdf having Application Letter and Transcript. 
              </Typography> 
            </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setFieldValue('ApplicationLetter', file);
                    }}
                    style={{ marginBottom: '1rem' }}
                    name="ApplicationLetter"
                  />
                  {errors.ApplicationLetter && (
                    <div className="error-red">{errors.ApplicationLetter}</div>
                  )}</FormControl>
                  )}
                  </Field> 
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
      )}
      </Formik>
    </Box>

     {/* Snackbar for success */}
     <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
     <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
       Transfer application submitted successfully!
     </MuiAlert>
   </Snackbar>

   {/* Snackbar for error */}
   <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
     <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
       Error submitting transfer application. Please try again.
     </MuiAlert>
   </Snackbar>

  </Container>
);
}
export default TransferForm;
