import React from 'react';
import { Box,Typography } from '@mui/material';
import { useUserAuth } from '../../components/context/UserAuthContext';

export default function studentProfile() {
  const {  user} = useUserAuth();
  
  return (
    <>
    <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>
    <div>studentProfile</div>
    </>
    
  )
}
