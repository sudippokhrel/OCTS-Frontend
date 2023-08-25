import React , {useState} from 'react'
import Navbar from '../../components/sidebar/Navbar'
import Box from '@mui/material/Box';
import Appbar from '../../components/navbar/Appbar';
import TransferForm from '../../components/transferform/TransferForm';
import {Button } from '@mui/material';
import { useNavigate } from 'react-router';
import '../../App.css';

const Home = () => {
  const [showAdditionalComponent, setShowAdditionalComponent] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook


  const handleApplyTransferClick = () => {
    setShowAdditionalComponent(!showAdditionalComponent);
  };

  const handleViewStatusClick = () => {
    navigate('/viewtransfers'); // Navigate to the ViewTransfer component
  };



  return (
    <>
    <div className='bg-colour'>
    <Appbar/>
    <Box height={70}/>
      <Box sx={{ display: 'flex' }}>

       <Navbar/>    
        <Box component="main" sx={{ flexGrow: 1, p: 3}}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 , gap:'10px'}}>
            <Button variant="contained" color="primary" onClick = {handleApplyTransferClick}>
              Apply for Transfer
            </Button>
      
            <Button variant="contained" color="primary" onClick={handleViewStatusClick}>
              View Status
            </Button>
          </Box>
          {showAdditionalComponent && (<Box sx={{marginTop:'10px'}}><TransferForm /></Box>)}
        
        </Box>
        
 
      </Box>
    </div>
     
    </>
    
  )
}


export default Home;