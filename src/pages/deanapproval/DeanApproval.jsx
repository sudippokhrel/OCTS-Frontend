import React , {useState} from 'react';
import Navbar from '../../components/sidebar/Navbar';
import Box from '@mui/material/Box';
import Appbar from '../../components/navbar/Appbar';

import '../../App.css';
import DeanApprovalTable from './DeanApprovalTable';
import DeanApproved from './DeanApproved';
import DeanRejected from './DeanRejected';


function DeanApproval() {

  return (
    <>
    <div className='bg-colour'>
    <Appbar/>
    <Box height={70}/>
      <Box sx={{ display: 'flex' }}>

       <Navbar/>    
        <Box component="main" sx={{ flexGrow: 1, p: 3}}> 
        <DeanApprovalTable/>
        <br></br>
        <DeanApproved/>
        <br></br>
        <DeanRejected/>
        </Box>
        
 
      </Box>
    </div>
     
    </>
  )
}

export default DeanApproval;
