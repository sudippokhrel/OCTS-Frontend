import React from 'react'
import Navbar from '../../components/sidebar/Navbar'
import Appbar from '../../components/navbar/Appbar'
import Box from '@mui/material/Box';


import '../../App.css';

import 'react-toastify/dist/ReactToastify.css';
import CoordinatorsTable from '../../components/users/coordinators/CoordinatorsTable.jsx';

function Coordinators() {

  return (
    <>
    <div className='bg-colour'>
    <Appbar/>
    <Box height={70}/>
      <Box sx={{ display: 'flex' }}>
        
       <Navbar/>    
        <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <CoordinatorsTable/>
 
        </Box>
      </Box>

    </div>

    </>
    
  )
}

export default Coordinators;