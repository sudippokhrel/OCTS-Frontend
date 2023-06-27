import React from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box';
import Appbar from '../components/Appbar';
import { useUserAuth} from '../components/context/UserAuthContext';
export default function Home() {

  const { logOut, logIn} = useUserAuth();
  //setLoggedIn(!loggedIn);
  console.log("is logged in", logIn);
  console.log("is logged in", logOut);
  return (
    <>

      <Appbar/>
      <Box height={30}/>
      <Box sx={{ display: 'flex' }}>
       <Navbar/>
    
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>View Transfers</h1>
        
        </Box>
      </Box>
     
    </>
    
  )
}
