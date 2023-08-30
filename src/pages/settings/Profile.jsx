import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { useUserAuth } from '../../components/context/UserAuthContext';
import { Typography, Box, Paper } from '@mui/material';
import { collection, getDocs, doc } from 'firebase/firestore';
import Navbar from '../../components/sidebar/Navbar';
import Appbar from '../../components/navbar/Appbar';
import Tab from "@mui/material/Tab";
import {TabPanel, TabList, TabContext } from '@mui/lab';
import PasswordUpdate from './PasswordUpdate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { blue } from '@mui/material/colors';

// Profile component
const Profile = () => {
  const { user } = useUserAuth();
  const [name, setName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [college, setCollege] = useState('');
  const [program, setProgram] = useState('');

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const userRef = doc(db,'users',userId);

      getDocs(collection(db, 'users'))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id === userId) {
              const userDetails = doc.data();
              const nameValue = userDetails.name;
              // const emailValue = userDetails.email;
              const facultyValue = userDetails.faculty;
              const collegeValue = userDetails.college;
              const programValue = userDetails.program;

              setName(nameValue);
              // setEmail(emailValue);
              setFaculty(facultyValue);
              setCollege(collegeValue);
              setProgram(programValue);
            }
          });
        })
        .catch((error) => {
          console.log('Error getting user document:', error);
        });
    }
  }, [user]);


  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: 'white',
        borderRadius: 0,
        boxShadow: 3,
        marginBottom: 4, // Added spacing
      }}
    >
      <Typography variant="h4" color={blue} gutterBottom>
        Profile Information
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Name:</strong> {name}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Email:</strong> {user.email}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Faculty:</strong> Science and Technology
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>College:</strong> {college}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Program:</strong> {program}
      </Typography>
    </Paper>
  );
};

const Home = () => {
  const [value, setValue] = useState('profile');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='bg-colour'>
      <Appbar />
      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',marginBottom: 4 }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Profile" icon={<AccountCircleIcon />} value="profile" />
                <Tab label="Settings" icon={<SettingsIcon />} value="settings" />
              </TabList>
            </Box>
            <TabPanel value="settings">
              <PasswordUpdate />
            </TabPanel>
            <TabPanel value="profile">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Profile />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
