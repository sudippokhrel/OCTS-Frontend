import React, { useState } from 'react';
import App from '../App'
import { Grid, Paper,Avatar, TextField, Button, Typography , Link } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import { blue } from '@mui/material/colors';



const Login=()=>{

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const [isValidEmailOrPhone, setIsValidEmailOrPhone] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track if the form has been submitted
  

  const validateEmailOrPhone = () => {
    const emailRegex = /^[\w.%+-]+@(gmail\.com|pu\.edu\.np|student\.pu\.edu\.np)$/;
    const phoneRegex = /^\+977\d{9}$/;
    setIsValidEmailOrPhone(emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone));
  };

  const validatePassword = () => {
    // Password validation rules (e.g., minimum 8 characters, at least one uppercase letter, etc.)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    setIsValidPassword(passwordRegex.test(password));
  };



  const handleEmailOrPhoneChange = (event) => {
    setEmailOrPhone(event.target.value);
    if (isFormSubmitted) {
        validateEmailOrPhone();
      }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (isFormSubmitted) {
        validatePassword();
      }
  };

 

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmailOrPhone();
    validatePassword();
    setIsFormSubmitted(true);
    
    // Perform further actions (e.g., submit form) based on validation results
  };

    const paperStyle={padding:20 , height:'70vh' , width:280 , margin:"20px auto"}
    const avatarStyle={backgroundColor:'#2473b2'}
    const textFieldStyle={margin:'10px 0'}
    const buttonStyle={margin:'8px 0'}
    const typographyStyle={margin:'5px 0'}
    return(
        <Grid>
            <Paper elevation={15 } style={paperStyle}>
                <Grid align='center'> 
                <Avatar style={avatarStyle}><LoginIcon/></Avatar>
                <h2>Sign In</h2></Grid>

                <form onSubmit={handleSubmit}>
                                
                <TextField id="outlined-basic" label='Email or phone' placeholder="Enter your email or phone " fullWidth required style={textFieldStyle} value={emailOrPhone} onChange={handleEmailOrPhoneChange}/>
                {isValidEmailOrPhone ? null : <span style={{ color: 'red' }}>Invalid email or phone number</span>}

                <TextField id="outlined-basic" label='Password' type="password" placeholder='Enter your password' fullWidth required style={textFieldStyle} value={password} onChange={handlePasswordChange}/>
                {isValidPassword ? null : <span style={{ color: 'red' }}>Invalid password</span>}

                <Button type='submit' fullWidth variant='contained'style={buttonStyle}>Sign in</Button> </form>
                <Typography style={typographyStyle}>
                    <Link href="#">Forgot password?</Link>
                </Typography>
                <Typography style={typographyStyle}> Don't have an account?
                    <Link href="#">Sign up now</Link>
                </Typography>
                
            </Paper>
        </Grid>
    )
}
export default Login





