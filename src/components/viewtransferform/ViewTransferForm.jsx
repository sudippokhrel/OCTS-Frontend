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
import { collection, getDocs ,query,where, addDoc,doc,updateDoc} from '@firebase/firestore';
import { db} from '../../firebase-config';
import generatePDF from '../../../pdf/generatePDF';
import { Button, Grid } from '@mui/material';
import { useUserAuth } from '../context/UserAuthContext';
import { storage } from '../../firebase-config';
import { uploadBytes, ref } from 'firebase/storage';
import {  getDownloadURL } from '@firebase/storage';


import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from 'sweetalert2';


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

  const handleFileUpload = async (row) => {
    try {
      const selectedFile = fileData.file;
      const fileName = fileData.fileName;

      // 1. Upload the file to Firebase Storage
      const storageRef = ref(storage, 'vouchers-pdfs/' + fileName);
      await uploadBytes(storageRef, selectedFile);

      // 2. Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // 3. Update Firestore document with the download URL
      const firestoreDocRef = doc(db, 'TransferApplications', row.id); // Replace with your actual Firestore collection and document ID
      await updateDoc(firestoreDocRef, {
        voucher: downloadURL,
      });
      Swal.fire("Uploaded","Voucher has been Uploaded","sucess");

      console.log('File uploaded and Firestore document updated with download URL:', downloadURL);
    } catch (error) {
      console.error('Error uploading file to Firebase Storage:', error);
    }
  };



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
            console.log("I am fetching the dataaaaaaaaaaaaaaaaa");
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
  }, [user]);


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
      <TableContainer sx={{ maxHeight: 550 }}>
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

                {/* Logic for Feedback / voucher Submission and more  with reference to approval*/}
                {row.isSucess ? (
  <TableRow>
    <TableCell colSpan={columns.length}>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
      <div style={{ fontWeight: 'bold', marginRight: '5px' }}>
      The Transfer Is Completed Sucessfully, Now You Can Join {row.destinationCollegeName}
       </div>
      <Button
        style={{
          padding: '5px 10px',
          fontSize: 12,
          backgroundColor: '#1976D2',
          color: 'white',
          fontWeight: 'bold',
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
            'Admission': 'Sucessfully Admitted ' ,
            'Transfer Sucess Status':'You Have been Accepted into '+ row.destinationCollegeName +" For " + row.program +" in Semester " +row.semester,
          };
          const pdfBlob = generatePDF(transferDataForPDF);
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(pdfBlob);
          downloadLink.download = 'TransferDetails.pdf';
          downloadLink.click();
        }}
      >
        Download Confirmation
      </Button>
    </div>

    </TableCell>
  </TableRow>
) : row.deanStatus === 'Approved by Dean' &&
  row.destinationCollegeStatus === 'Approved by Destination College Head' ? (
  <TableRow>
    <TableCell colSpan={columns.length}>
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
      <div style={{ fontWeight: 'bold', marginRight: '5px' }}>
             Your Form is approved By Dean, Download Pdf and Go to Destination College ({row.destinationCollegeName}) For Admission
      </div>
          <Button
            style={{
              padding: '5px 10px',
              fontSize: 12,
              backgroundColor: '#1976D2',
              color: 'white',
              fontWeight: 'bold',
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
    </TableCell>
  </TableRow>
) : row.destinationCollegeStatus === 'Approved by Destination College Head' ? (
  <TableRow>
    <TableCell colSpan={columns.length}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
              handleFileUpload(row)
            }}
          >
            <CloudUploadIcon />
          </IconButton>
        </div>
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
      
          
            <div style={{ display: 'flex', alignItems: 'center' , marginLeft: '10px'}}>
            {row.voucher  ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Voucher/Documents:</div>
                      <a href={row.voucher} target="_blank" rel="noopener noreferrer">
                        Documents
                      </a>
                    </div>
                    ) : (
                      ''
                    )}
            </div>
       </div>

    </TableCell>
  </TableRow>
) : null}
            {/* Logic when the form is rejected */}
            {row.sourceCollegeCoordinatorStatus == 'Rejected by Source College Coordinator' ||row.sourceCollegeStatus == 'Rejected by Source College Head' 
            || row.destinationCollegeCoordinatorStatus == 'Rejected by Destination College Coordinator'|| row.DestinationCollegeStatus == 'Rejected by Destination College Head' 
            || row.deanStatus =='Rejected by Dean' ?(
              <TableRow>
                <TableCell colSpan={columns.length}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ fontWeight: 'bold', marginRight: '5px' }}>
                    Your form has been rejected, Unfortunately you can't be Transfered to {row.destinationCollegeName}
                  </div>

                </div>

                </TableCell>
              </TableRow>

            ):null}


                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2,5, 8, 10, 25, 100]}
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