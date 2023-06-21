import React from 'react'
import Navbar from './Navbar'
import Box from '@mui/material/Box';
import Appbar from './Appbar';
import TransferForm from '../pages/TransferForm';

export default function Home() {
  return (
    <>
      <Appbar/>
      <Box height={30}/>
      <Box sx={{ display: 'flex' }}>
       <Navbar/>
    
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>applyfortransfer</h1>
          <TransferForm/>
        
        </Box>
        <Box>
          <h1>
            This is heading below 
          </h1>
        </Box>
      </Box>
     
    </>
    
  )
}

