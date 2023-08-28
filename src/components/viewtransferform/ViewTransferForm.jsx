import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import { collection, getDocs } from '@firebase/firestore';
import { db} from '../../firebase-config';

import { useUserAuth } from '../context/UserAuthContext';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'puRegNumber', label: 'Registration Number', minWidth: 170 },
  { id: 'sourceCollegeName', label: 'Source College', minWidth: 170 },
  { id: 'destinationCollegeName', label: 'Destination College', minWidth: 170 },
  { id: 'program', label: 'Program', minWidth: 100 },
  { id: 'semester', label: 'Semester', minWidth: 170, align: 'right' },
  //{ id: 'action', label: 'Action', minWidth: 100 },
  { id: 'sourceCollegeStatus', label: 'Source College Status', minWidth: 100 },
  { id: 'destinationCollegeStatus', label: 'Destination College Status', minWidth: 100 },
  { id: 'deanStatus', label: 'Dean Status', minWidth: 100 },
  { id: 'ApplicationLetter', label: 'Application Letter', minWidth: 100 },
];



const ViewTransfer = () => {

  const { user } = useUserAuth(); // Assuming currentUser contains the user's information

  const [transferApplications, setTransferApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 const [downloadUrls, setDownloadUrls] = useState({});


  useEffect(() => {


    const fetchTransferApplications = async () => {
      try {
        const transferApplicationsCollection = collection(db, 'TransferApplications');
        const transferApplicationsSnapshot = await getDocs(transferApplicationsCollection);
        
        const applicationsData = [];
        transferApplicationsSnapshot.forEach((doc) => {
          const applicationData = doc.data();
          if (applicationData.email === user.email) { // Filter applications by user email
            applicationsData.push({ id: doc.id, ...applicationData });
          }
        });

        setTransferApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching transfer applications:', error);
      }
    };

    if (user) { // Ensure currentUser is defined before fetching applications
      fetchTransferApplications();
    }
  }, [transferApplications,user]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px' }}>
        Transfer Requests
      </Typography>
      <Divider />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transferApplications
              
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    if (column.id === 'ApplicationLetter') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                    {row.ApplicationLetterPath  ? (
                      <a href={row.ApplicationLetterPath} target="_blank" rel="noopener noreferrer">
                        View Application Letter
                      </a>
                    ) : (
                      'No application letter'
                    )}
                  </TableCell>
                      );
                    }
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 8, 10, 25, 100]}
        component="div"
        count={transferApplications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ViewTransfer;