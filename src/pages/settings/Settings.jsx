import React from 'react'
import Navbar from '../../components/sidebar/Navbar'
import Box from '@mui/material/Box';
import Appbar from '../../components/navbar/Appbar';

export default function Home() {
  return (
    <>
    <Appbar/>
    <Box height={30}/>
      <Box sx={{ display: 'flex' }}>
       <Navbar/>
    
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Settings</h1>
        
        </Box>
      </Box>
     
    </>
    
  )
}