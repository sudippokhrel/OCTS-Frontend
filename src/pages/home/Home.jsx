import React from 'react'
import Navbar from '../../components/sidebar/Navbar'
import Appbar from '../../components/navbar/Appbar'
import Box from '@mui/material/Box';
import {Button } from '@mui/material';


import '../../App.css';
import SeatTable from '../../components/seatlist/SeatList';


import 'react-toastify/dist/ReactToastify.css';

function Home() {

  return (
    <>
    <div className='bg-colour'>
    <Appbar/>
    <Box height={70}/>
      <Box sx={{ display: 'flex' }}>
        
       <Navbar/>    
        <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <SeatTable/>
 
        </Box>
      </Box>

    </div>

    </>
    
  )
}

export default Home;