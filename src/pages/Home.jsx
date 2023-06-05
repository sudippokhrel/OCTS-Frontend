import React from 'react'
import Navbar from '../components/Navbar'
import Appbar from '../components/Appbar'
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <>

    <Appbar/>
    <Box height={30}/>
      <Box sx={{ display: 'flex' }}>
        
       <Navbar/>
    
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Home testinggg</h1>
        
        </Box>
      </Box>
     
    </>
    
  )
}
