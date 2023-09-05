import React from 'react';
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button } from '@mui/material';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db,  } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";



// Role based  add option
import { useUserAuth } from '../../components/context/UserAuthContext';
import getUserRole from '../../components/users/getUserRole';
import getUserCollege from '../../components/users/getUserCollege';
import getUserProgram from '../../components/users/getUserProgram';



export default function DestinationCollegeApprovedTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [rows, setRows] = useState([]);  
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const {  user} = useUserAuth();//to display the profile bar according to user
  const [userRole, setUserRole] = React.useState(null);
  const [userCollege, setUserCollege] = React.useState(null);
  const [userProgram, setUserProgram] = React.useState(null);

  

  useEffect(() => {

    const fetchData = async () => {
      if (user) {
        const role = await getUserRole(user.uid);
        setUserRole(role);

        if (role !== "admin" && role != "dean") {
          const college = await getUserCollege(user.uid);
          setUserCollege(college);
          const program = await getUserProgram(user.uid);
          

          setUserProgram(program);
          console.log("user Program is :",userProgram);
          console.log("user Program is :",userCollege);

         // Fetch form based on userCollege here
          // getForms(college,program);
          
        } else {
        // Fetch form for admin
        // getForms(userCollege, userProgram);
      }

        setIsLoading(false);
      }
      if (!isLoading) {
        if (userRole === "admin" || userRole== "dean") {
          getForms();
        } else {
          getForms(userCollege,userProgram);
        }
        
      }
    };
    fetchData();

  }, [user,userRole, userCollege, userProgram, isLoading]);

  // useEffect(() => {
    
  // }, [userRole, userCollege,userProgram, isLoading]);



  const getForms = async (userCollege,userProgram) => {

    const empCollectionRef = collection(db, "TransferApplications");
    console.log("user Program inside is :",userProgram);
          console.log("user College inside is :",userCollege);
          console.log("user isloading inside is :",isLoading);
          console.log("userRole is ", userRole);


    // Enter the Logic here to render the Application Forms


    if (userRole=='admin' || userRole=='dean'){
      const q = query(empCollectionRef, where("sourceCollegeStatus", "==", 'Approved by Source College Head'), where("destinationCollegeStatus", "==", 'Approved by Destination College Head')); // Use query() function here
      const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);
    }else if (userRole=='college_head' || userRole=='director'){
      const q = query(empCollectionRef, where("destinationCollegeStatus", "==", 'Approved by Destination College Head'), where("destinationCollegeCoordinatorStatus", "==", 'Approved by Destination College Coordinator'), where("sourceCollegeStatus", "==", 'Approved by Source College Head'),  where("destinationCollegeName", "==", userCollege)
      ); // Use query() function here
    const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);
    }
    else if (userRole=='program_coordinator' || userRole=='coordinator'){
      const q = query(empCollectionRef, where("destinationCollegeCoordinatorStatus", "==", 'Approved by Destination College Coordinator'), where("sourceCollegeStatus", "==", 'Approved by Source College Head'), where("destinationCollegeName", "==", userCollege), where("program", "==", userProgram)); // Use query() function here
    const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);

    }


  };

// Change Seats after Dean Approved
  const adjustSeats = (id, sourceCollegeName, destinationCollegeName, program, semester) =>{
    Swal.fire({
      title: "Are you sure to Accept student and  Update Seats?",
      text: "This is done once Student is Admitted to your college,and You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Complete Transfer!",
    }).then((result) => {
      if (result.value) {
        adjustApi(id, sourceCollegeName, destinationCollegeName, program, semester);
      }
    });

  };

  const adjustApi = async (id, sourceCollegeName, destinationCollegeName, program, semester) => { 
    console.log(" Source College", sourceCollegeName);
    console.log("Destination College", destinationCollegeName);
     try {
      const seatsDocRef = collection(db, "seats");

      // Query to decrease seats for the source college
      const qdecrease = query(
        seatsDocRef,
        where("College", "==", sourceCollegeName),
        where("Program", "==", program),
        where("Semester", "==", semester)
      );
      
      const decreaseQuerySnapshot = await getDocs(qdecrease);
      
      if (!decreaseQuerySnapshot.empty) {
        const decreaseDoc = decreaseQuerySnapshot.docs[0];
        const decreaseDocRef = decreaseDoc.ref;
        const currentDecreaseSeats = decreaseDoc.data().Seats;
        console.log("Seats of Source Before Decreasing",currentDecreaseSeats);
      
        if (currentDecreaseSeats > 0) {
          await updateDoc(decreaseDocRef, { Seats: currentDecreaseSeats - 1 });
        } else {
          console.log("No available seats to decrease for source document:", decreaseDoc.id);
        }
      } 
      
      // Query to increase seats for the destination college
      const qincrease = query(
        seatsDocRef,
        where("College", "==", destinationCollegeName),
        where("Program", "==", program),
        where("Semester", "==", semester)
      );

      // Update isSucess value after successful adjustments
    const transferDocRef = doc(db, "TransferApplications", id);
    await updateDoc(transferDocRef, { isSucess: true });

    // Find the index of the updated row in the rows array
    const updatedRowIndex = rows.findIndex(row => row.id === id);

    // Update the specific row in the rows array
    if (updatedRowIndex !== -1) {
      const updatedRow = { ...rows[updatedRowIndex], isSucess: true };
      const updatedRows = [...rows];
      updatedRows[updatedRowIndex] = updatedRow;
      setRows(updatedRows);
    }
      
      const increaseQuerySnapshot = await getDocs(qincrease);
      
      if (!increaseQuerySnapshot.empty) {
        const increaseDoc = increaseQuerySnapshot.docs[0];
        const increaseDocRef = increaseDoc.ref;
        const currentIncreaseSeats = increaseDoc.data().Seats;
        console.log("Seats of Destination Before Increasing",currentIncreaseSeats);
      
        // Increase the Seats
        if (currentIncreaseSeats < increaseDoc.data().TotalSeats) {
          const newIncreaseSeats = currentIncreaseSeats + 1;
          await updateDoc(increaseDocRef, { Seats: newIncreaseSeats });
          console.log("Seats increased for destination document:", increaseDoc.id);
        } else {
          console.log("No available seats to increase for destination document:", increaseDoc.id);
        }
      } else {
        console.log("No matching document found for destination seat increase.");
      }
   Swal.fire("Approved!", "Seats has been Updated", "success");
   
   // to change the Accept transfer button after adjusting Seats
  
 }catch (error) {
   console.error('Error approving application:', error);
 }
};




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  

  const filterDataSemester = (v) => {
    if (v) {
      // Filter the rows based on the selected value
      const filteredRows = rows.filter((row) => row.semester === v);
      setRows(filteredRows);
    } else {
      // Reset the rows to the original data
      getForms(userCollege, userProgram);
    }
  };

  const filterData = (v) => {
    if (v) {
      // Filter the rows based on the selected value
      const filteredRows = rows.filter((row) => row.program === v);
      setRows(filteredRows);
    } else {
      // Reset the rows to the original data
      getForms(userCollege, userProgram);
    }
  };
  
  
  const uniqueName = Array.from(new Set(rows.map((rows) => rows.program)));
  const uniqueSemester = Array.from(new Set(rows.map((rows) => rows.semester)));

  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "15px" }}
          >
          Transfer Forms Approver by {userRole}                     
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            {userRole == "admin" || userRole=="college_head" || userRole== "dean" ? (
              <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={uniqueName}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(row) => row  || ""}
              renderInput={(params) => (
                
                <TextField {...params} size="small" label="Search Program" />
              )}
            />

            ): null }

              {userRole == "program_coordinator" && (
              <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={uniqueSemester}
              sx={{ width: 300 }}
              onChange={(e, v) => filterDataSemester(v)}
              getOptionLabel={(row) => row  || ""}
              renderInput={(params) => (
                
                <TextField {...params} size="small" label="Search Semester" />
              )}
            />

            )}
            
          </Stack>


          <Box height={10} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Registration Number
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Source College
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Destination College
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Program
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Semester
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Transfer Letter
                  </TableCell>
                  {userRole == "program_coordinator" || userRole=="coordinator" ? (
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                    Destination College Head Status
                  </TableCell>

                  ): null }
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Dean Status
                  </TableCell>
                  {userRole == "program_coordinator" || userRole=="coordinator" ? (
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                    Transfer Status
                  </TableCell>

                  ): null }
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                  
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.puRegNumber}</TableCell>
                        <TableCell align="left">{row.sourceCollegeName}</TableCell>
                        <TableCell align="left">{row.destinationCollegeName}</TableCell>
                        <TableCell align="left">{row.program}</TableCell>
                        <TableCell align="left">{row.semester}</TableCell>
                        <TableCell align="left">
                          {row.ApplicationLetterPath ? (
                           <a href={row.ApplicationLetterPath} target="_blank" rel="noopener noreferrer">
                             View Application Letter
                              </a>
                             ) : (
                              'No Application Letter'
                               )}
                        </TableCell>
                        {userRole == "program_coordinator" || userRole=="coordinator" ? (
                          <TableCell align="left">{row.destinationCollegeStatus}</TableCell>

                        ): null }
                        <TableCell align="left">{row.deanStatus}</TableCell>
                        {userRole == "program_coordinator" || userRole=="coordinator" ? (
                          <TableCell align="left">
                            {row.DestinationCollegeStatus == 'Rejected by Destination College Head' 
                          || row.deanStatus =='Rejected by Dean' ?(
                          <strong>Transfer Is Rejected</strong>):
                          (row.isSucess ?(<strong>Transfer Is Sucess</strong>):(
                          <strong>Transfer Is Underway</strong>
                          )
                            
  
                          )}
                          </TableCell>

                        ): null }
                        {/* this table cell is filtered based on coordinator approval */}
                        {userRole == "college_head" || userRole=="director" ? (
                        <TableCell align="left">
                          {row.deanStatus === 'Approved by Dean' ? (
                            row.isSucess == 0 ? (
                            <Button
                              variant="contained"
                              color="primary"
                              style={{
                                padding: '5px 10px',  // Adjust padding as needed
                                margin: '-6px -16px', // Negative margins to remove gaps      // Remove border
                                fontSize:10,
                                backgroundColor: "#1976D2",
                                color: "white",
                                fontWeight: "bold",
                              }}
                              onClick={() => adjustSeats(row.id, row.sourceCollegeName, row.destinationCollegeName, row.program, row.semester)}
                            >
                            Complete Transfer
                            </Button>
                            ) : (
                            <strong>Transfer Is Completed</strong>
                              )
                            ) : (
                              // Empty cell
                           ''
                          )}
                        </TableCell>
                        ): null }
                 
                    
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2,5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )} 
    </>
  );
}