import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { useUserAuth } from '../../components/context/UserAuthContext';
import { Typography } from '@mui/material';
import { collection, getDocs, doc } from 'firebase/firestore';
import Navbar from '../../components/sidebar/Navbar'
import Appbar from '../../components/navbar/Appbar'
import Box from '@mui/system/Box';
// import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel, TabList, TabContext } from '@mui/lab';

// Profile component
const Profile = () => {

  const { user } = useUserAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [faculty, setFaculty] = useState('');
  const [college, setCollege] = useState('');
  const [program, setProgram] = useState('');

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const userRef = doc(db, 'users', userId);

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
    <Box
      sx={{
        width: 450,
        height: 350,
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
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Faculty:</strong> {faculty}
      </p>
      <p>
        <strong>College:</strong> {college}
      </p>
      <p>
        <strong>Program:</strong> {program}
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