import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { minHeight } from '@mui/system';
import SourceCollegeTable from './SourceCollegeTable';
import DestinationCollegeTable from './DestinationCollegeTable';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(25),
    marginRight: theme.spacing(1),
    color: '#141414',
    '&.Mui-selected': {
      color: '#00308F',
    },
    '&.Mui-focusVisible': {
      backgroundColor: "#ff4500",
    },
  }),
);

function Lists(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

Lists.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ padding:0, minHeight:44 + 'vh'}}>
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <StyledTab label="Outgoing " {...a11yProps(0)} />
              <StyledTab label="Incoming" {...a11yProps(1)} />
            </StyledTabs>
          </Box>
          <Lists value={value} index={0}>
            <SourceCollegeTable/>
          </Lists>
          <Lists value={value} index={1}>
            <DestinationCollegeTable/>
          </Lists>
        </Box>
     </CardContent>
   </Card>
  );
}
