import React, { useState } from 'react';
import Navbar from '../../components/sidebar/Navbar'
import Appbar from '../../components/navbar/Appbar'
import Box from '@mui/system/Box';
// import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel, TabList, TabContext } from '@mui/lab';

// Profile component
const Profile = () => {
  // Sample profile data
  const profileData = {
    name: 'Dr. Udaya Raj Dhungana',
    email: 'udaya@example.com',
    role: 'Program Coordinator',
    college: 'School of Engineering',
  };

  return (
    <Box
      sx={{
        width: 450,
        height: 250,
        backgroundColor:'white',
        border: '2px solid gray',
        padding: 5,
        fontSize: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        borderRadius: 8,
        textAlign: 'left',
      }}
    >
      <p>
        <strong>Name:</strong> {profileData.name}
      </p>
      <p>
        <strong>Email:</strong> {profileData.email}
      </p>
      <p>
        <strong>Role:</strong> {profileData.role}
      </p>
      <p>
        <strong>College:</strong> {profileData.college}
      </p>
    </Box>
  );
};

export default function Home() {
  const [value, setValue] = useState('profile'); // Active tab state

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='bg-colour'>
    <Appbar/>
    <Box height={70}/>
      <Box sx={{ display: 'flex' }}>
        
       <Navbar/>    
        <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <h1> </h1>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Profile" value="profile" />
                <Tab label="Settings" value="settings" />
              </TabList>
            </Box>
            <TabPanel value="settings">Settings content</TabPanel>
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
    </>
  );
}