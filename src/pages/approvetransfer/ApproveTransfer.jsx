import React , {useState} from 'react';
import Navbar from '../../components/sidebar/Navbar';
import Box from '@mui/material/Box';
import Appbar from '../../components/navbar/Appbar';
import Lists from './List';

import '../../App.css';


function ApproveTransfer() {

  return (
    <>
    <div className='bg-colour'>
    <Appbar/>
    <Box height={70}/>
      <Box sx={{ display: 'flex' }}>

       <Navbar/>    
        <Box component="main" sx={{ flexGrow: 1, p: 3}}> 
          <Lists/>
        </Box>
        
 
      </Box>
    </div>
     
    </>
  )
}

export default ApproveTransfer;
