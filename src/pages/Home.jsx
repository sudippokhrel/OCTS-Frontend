import React from 'react'
import Navbar from '../components/Navbar'
import Appbar from '../components/Appbar'
import Box from '@mui/material/Box';
import {Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../components/context/UserAuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Home=()=> {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('You have successfully logged out')
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <Appbar/>
    <Box height={30}/>
      <Box sx={{ display: 'flex' }}>
        
       <Navbar/>

    
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div style={{ marginTop: '10px' }}>
         Hello! Welcome <br />
        {user && user.email}
        </div>
        
        <div style={{ marginTop: '10px' }}>
        <Button variant="primary" onClick={handleLogout}>
        Log out
        </Button>
        </div>
        
        </Box>
      </Box>
     
    </>
    
  )
}

export default Home;