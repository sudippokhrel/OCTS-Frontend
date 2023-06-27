// import React from 'react'
// import Navbar from '../components/Navbar'
// import Box from '@mui/material/Box';
// import Appbar from '../components/Appbar';

// // Profile component
// const Profile = () => {
//   return (
//     <div>
//       <h1>Profile</h1>
//       {/* Add profile content here */}
//     </div>
//   );
// };

// export default function Home() {
//   return (
//     <>
//     <Appbar/>
//     <Box height={30}/>
//       <Box sx={{ display: 'flex' }}>
//        <Navbar/>
    
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           {/* Render different components based on the selected tab */}
//           {tab === 'settings' && <h1>Settings</h1>}
//           {tab === 'profile' && <Profile />}
//           <TabPanel value={value} index={0}>
//             Profile
//           </TabPanel>
//         </Box>
//       </Box>
     
//     </>
    
//   )
// }



// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Box from '@mui/material/Box';
// import Appbar from '../components/Appbar';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

// // Profile component
// const Profile = () => {
//   const profileData = {
//     name: 'Udaya Raj Dhungana',
//     email: 'udaya@example.com',
//     role: 'Program Coordinator',
//     college: 'School of Engineering',
//   };
//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>Name: {profileData.name}</p>
//       <p>Email: {profileData.email}</p>
//       <p>Role: {profileData.role}</p>
//       <p>College: {profileData.college}</p>
//     </div>
//   );
// };

// export default function Home() {
//   return (
//     <>
//       <Appbar />
//       <Box height={30} />
//       <Box sx={{ display: 'flex' }}>
//         <Navbar />

//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <h1>Settings</h1>
//         </Box>
//       </Box>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <h1>Settings</h1>
//         <Tabs value={value} onChange={handleChange}>
//           <Tab label="Settings" />
//           <Tab label="Profile" />
//         </Tabs>
//         {value === 0 && <h1>Settings</h1>}
//         {value === 1 && <Profile />}
//       </Box>
//     </>
//   );
// }

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Appbar from '../components/Appbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Profile component
const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      {/* Add profile content here */}
    </div>
  );
};

export default function Home() {
  const [value, setValue] = useState(0); // Active tab state

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Appbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Navbar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Settings" />
            <Tab label="Profile" />
          </Tabs>
          {value === 0 && <h1>Settings</h1>}
          {value === 1 && <Profile />}
        </Box>
      </Box>
    </>
  );
}
