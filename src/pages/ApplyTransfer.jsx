import React from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
       <Navbar/>
    
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>applyfortransfer</h1>
        
        </Box>
      </Box>
     
    </>
    
  )
}

