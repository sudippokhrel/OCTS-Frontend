import React from 'react'
import Navbar from "../../components/sidebar/Navbar";
import Appbar from "../../components/navbar/Appbar";
import Box from "@mui/system/Box";
// import Tabs from '@mui/material/Tab';
import Tab from "@mui/material/Tab";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';

const PasswordUpdate = () => {
  return (
    <Box
      sx={{
        width: 450,
        height: 350,
        backgroundColor:'white',
        border: '2px solid gray',
        padding: 5,
        fontSize: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        borderRadius: 8,
        textAlign: 'left',
      }}
    >
    <div>
      <h2>Change Password</h2>
      <Formik
      >
        <Form>
          <div>
            <label htmlFor="oldPassword">Old Password:</label>
            <Field
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter old password"
            />
            <ErrorMessage name="oldPassword" component="div" />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <Field
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
            />
            <ErrorMessage name="newPassword" component="div" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
            />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <Grid item>
                <Button variant="contained" type="submit" fullWidth>
                  Change Password
                </Button>
              </Grid>
        </Form>
      </Formik>
    </div>
    </Box>
  )
}

export default PasswordUpdate