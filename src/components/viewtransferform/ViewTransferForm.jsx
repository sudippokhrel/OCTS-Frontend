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
import generatePDF from '../../../pdf/generatePDF';
import { Button, Grid } from '@mui/material';
import { useUserAuth } from '../context/UserAuthContext';

import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const columns = [
  { id: 'name', label: 'Name' },
  { id: 'puRegNumber', label: 'Registration Number', minWidth: 100 },
  { id: 'sourceCollegeName', label: 'Source College', minWidth: 100 },
  { id: 'destinationCollegeName', label: 'Destination College', minWidth: 100 },
  { id: 'program', label: 'Program', minWidth: 100 },
  { id: 'semester', label: 'Semester', minWidth: 80 },
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
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const [fileData, setFileData] = useState({ file: null, fileName: 'voucher to dean' });



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
                <React.Fragment key={row.id}>
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    if (column.id === 'ApplicationLetter') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                    {row.ApplicationLetterPath  ? (
                      <div>
                      <a href={row.ApplicationLetterPath} target="_blank" rel="noopener noreferrer">
                        View Application Letter
                      </a>
                    </div>
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
                {row.destinationCollegeStatus === 'Approved by Destination College Head' && (
                <TableRow>
                <TableCell colSpan={columns.length}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Input field and upload button */}
                    <div style={{ marginRight: '10px' }}>
                      <Input
                        type="file"
                        onChange={(e) => {
                          setFileData({
                            file: e.target.files[0],
                            fileName: e.target.files[0].name,
                          });
                        }}
                      />
                      <IconButton
                        onClick={() => {
                          // Handle the file upload to Firebase Storage here
                          // You'll need to implement this logic
                          // Use fileData.file to access the selected file
                        }}
                      >
                        <CloudUploadIcon />
                      </IconButton>
                    </div>
                    {/* Dean's remark */}
                    {row.deanRemark && (
                      <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Dean Remark:</div>
                        <div style={{ fontStyle: 'italic', color: 'gray' }}>
                          "{row.deanRemark}"
                        </div>
                      </div>
                    </div>
                    )}
                    {/* Download PDF button */}
                    {row.deanStatus === 'Approved by Dean' && (
                      <div style={{ marginLeft: '10px' }}>
                        <Button
                        style={{
                          padding: '5px 10px',  // Adjust padding as needed
                          margin: '-6px -16px', // Negative margins to remove gaps      // Remove border
                          fontSize:12,
                          backgroundColor: "#1976D2",
                          color: "white",
                          fontWeight: "bold",
                        }}
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            const transferDataForPDF = {
                              Name: row.name,
                              'Registration Number': row.puRegNumber,
                              'Source College': row.sourceCollegeName,
                              'Destination College': row.destinationCollegeName,
                              Program: row.program,
                              Semester: row.semester,
                              'Source College Status': row.sourceCollegeStatus,
                              'Destination College Status': row.destinationCollegeStatus,
                              'Dean Status': row.deanStatus,
                            };
                            const pdfBlob = generatePDF(transferDataForPDF);
                            const downloadLink = document.createElement('a');
                            downloadLink.href = URL.createObjectURL(pdfBlob);
                            downloadLink.download = 'TransferDetails.pdf';
                            downloadLink.click();
                          }}
                        >
                          Download PDF
                        </Button>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              
      )}
                </React.Fragment>
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