// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// // icons for home login transfer forms
// import HomeIcon from '@mui/icons-material/Home';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout';
// import SettingsIcon from '@mui/icons-material/Settings';
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import GradingIcon from '@mui/icons-material/Grading';
// import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import AppsOutageIcon from '@mui/icons-material/AppsOutage';
// import AppsIcon from '@mui/icons-material/Apps';
// import MailIcon from '@mui/icons-material/Mail';
// import { toast } from 'react-toastify';
// // importing navigation to make events for navigation bar 
// import {useNavigate} from 'react-router-dom';
// import { useUserAuth } from '../context/UserAuthContext';


// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));


// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// export default function Navbar() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);
//   //For navigation of pages
//   const navigate = useNavigate();

// //for handling logout after being clicked 
//   const { logOut, user} = useUserAuth();
//   const handleLogout = async () => {
//     try {
//       await logOut();
//       toast.success('You have successfully logged out')
//       navigate("/logout");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };


//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={()=>setOpen(!open)}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
          
//             <ListItem key="home" disablePadding sx={{ display: 'block' }} onClick={()=>{navigate("/")}}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <HomeIcon />
//                 </ListItemIcon>
//                 <ListItemText primary= "Home" sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>

//             <Divider />

//             <ListItem key="applytransfer"  disablePadding sx={{ display: 'block' }} onClick={()=>{navigate("/applytransfer")}}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <FormatAlignJustifyIcon />
//                 </ListItemIcon>
//                 <ListItemText primary= "Apply Transfer" sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>

//             <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>{navigate("/viewtransfers")}}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <GradingIcon />
//                 </ListItemIcon>
//                 <ListItemText primary= "View Transfers" sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>

//             <Divider/>

//             {user ? (
//             <>
//             <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>{navigate("/settings")}}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <SettingsIcon />
//                 </ListItemIcon>
//                 <ListItemText primary= "Settings" sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding sx={{ display: 'block' }} onClick={handleLogout}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <LogoutIcon />
//                 </ListItemIcon>
//                 <ListItemText primary= "Logout" sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//             </>

//             ):(
//           <>
//             <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{navigate("/signup")}}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <AppRegistrationIcon />
//               </ListItemIcon>
//               <ListItemText primary= "Sign Up" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{navigate("/login")}}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//               >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//                 >
//                 <LoginIcon />
//               </ListItemIcon>
//               <ListItemText primary= "Login" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//             </ListItem>
//           </>
          
          
//           )}
            

            
            
          
//         </List>
      
      
        
//       </Drawer>
      
//     </Box>
//   );
// }

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// icons for home login transfer forms
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import GradingIcon from '@mui/icons-material/Grading';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import AppsIcon from '@mui/icons-material/Apps';
import MailIcon from '@mui/icons-material/Mail';
import { toast } from 'react-toastify';
// importing navigation to make events for navigation bar 
import {useNavigate} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import getUserRole from '../users/getUserRole';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const { logOut, user } = useUserAuth();
  const [userRole, setUserRole] = React.useState(null);

  React.useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const role = await getUserRole(user.uid);
        setUserRole(role);
      }
    };

    fetchUserRole();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('You have successfully logged out');
      navigate('/logout');
    } catch (error) {
      console.log(error.message);
    }
  };

  let navigationItems = [];

  if (!user) {
    navigationItems = [
      { key: 'home', icon: <HomeIcon />, text: 'Home', path: '/' },
      { key: 'signup', icon: <AppRegistrationIcon />, text: 'Sign Up', path: '/signup' },
      { key: 'login', icon: <LoginIcon />, text: 'Login', path: '/login' },
    ];
  } else if (userRole === 'student') {
    navigationItems = [
      { key: 'home', icon: <HomeIcon />, text: 'Home', path: '/' },
      { key: 'applytransfer', icon: <FormatAlignJustifyIcon />, text: 'Apply Transfer', path: '/applytransfer' },
      { key: 'viewtransfers', icon: <GradingIcon />, text: 'View Transfers', path: '/viewtransfers' },
      { key: 'settings', icon: <SettingsIcon />, text: 'Settings', path: '/settings' },
    ];
  } else if (userRole === 'college_head' || userRole === 'program_coordinator' || userRole === 'dean') {
    navigationItems = [
      { key: 'home', icon: <HomeIcon />, text: 'Home', path: '/' },
      { key: 'viewtransfers', icon: <GradingIcon />, text: 'View Transfers', path: '/viewtransfers' },
      { key: 'settings', icon: <SettingsIcon />, text: 'Settings', path: '/settings' },
    ];
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.key}
              disablePadding
              sx={{ display: 'block' }}
              onClick={() => navigate(item.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
          {user && (
            <ListItem disablePadding sx={{ display: 'block' }} onClick={handleLogout}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}

