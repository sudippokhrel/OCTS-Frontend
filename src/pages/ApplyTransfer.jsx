import React , {useState} from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box';
import Appbar from '../components/Appbar';
import TransferForm from '../components/TransferForm';
import {Button } from '@mui/material';

const Home = () => {
  const [showAdditionalComponent, setShowAdditionalComponent] = useState(false);
  

  const handleApplyTransferClick = () => {
    setShowAdditionalComponent(!showAdditionalComponent);
    
};



  return (
    <>
      <Appbar/>
      <Box height={30}/>
      <Box sx={{ display: 'flex' }}>
       <Navbar/>
    
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       
    
     {/* Add the button inside the Box component */}
     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 , gap:'10px'}}>
     <Button variant="contained" color="primary" onClick = {handleApplyTransferClick}>
        Apply for Transfer
      </Button>
      
      <Button variant="contained" color="primary">
        View Status
      </Button>
          </Box>
          {showAdditionalComponent && (<Box sx={{marginTop:'10px'}}><TransferForm /></Box>)}
        
        </Box>
      </Box>
     
    </>
    
  )
}


export default Home;