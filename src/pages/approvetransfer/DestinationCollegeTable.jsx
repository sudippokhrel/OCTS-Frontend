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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase-config";
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
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";



// Role based  add option
import { useUserAuth } from '../../components/context/UserAuthContext';
import getUserRole from '../../components/users/getUserRole';
import getUserCollege from '../../components/users/getUserCollege';
import getUserProgram from '../../components/users/getUserProgram';


export default function SourceCollegeTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

        if (role !== "admin" || role != "dean") {
          const college = await getUserCollege(user.uid);
          setUserCollege(college);
          const program = await getUserProgram(user.uid);
          setUserProgram(program);

          // Fetch seats based on userCollege here
          getForms(college,program);
        } else {
          // Fetch seats for admin
          getForms();
        }

        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      if (userRole === "admin"|| userRole== "dean") {
        getForms();
      } else {
        getForms(userCollege,userProgram);
      }
    }
  }, [userRole, userCollege,userProgram, isLoading]);



  const getForms = async (userCollege,userProgram) => {

    const empCollectionRef = collection(db, "seats");

    // Enter the Logic here to render the Application Forms


    // if (userRole=='admin' || userRole=='dean'){
    //   const q = query(empCollectionRef); // Use query() function here
    //   const data = await getDocs(q);
    // const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // setRows(fetchedRows);
    // }else if (userRole=='college_head'){
    //   const q = query(empCollectionRef, where("College", "==", userCollege)); // Use query() function here
    // const data = await getDocs(q);
    // const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // setRows(fetchedRows);

    // }
    // else if (userRole=='program_coordinator'){
    //   const q = query(empCollectionRef, where("College", "==", userCollege),
    //   where("Program", "==", userProgram)); // Use query() function here
    // const data = await getDocs(q);
    // const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // setRows(fetchedRows);
    // }

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const accpetUser = (id) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve user!",
    }).then((result) => {
      if (result.value) {
        approveApi(id);
      }
    });

  };

  const approveApi = async (id) => {
    // Logic for  Approving the form/ students



    Swal.fire("Approved!", "Form has been Approved", "success");
    getForms();
  };


  const rejectUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.value) {
        rejectApi(id);
      }
    });
  };

  const rejectApi = async (id) => {
    const userDoc = doc(db, "TransferApplications", id);

    // Logic For Rejecting  the student



    Swal.fire("Rejected!", "Form has been rejected.", "success");
    getForms();
  };


  const filterDataSemester = (v) => {
    if (v) {
      // Filter the rows based on the selected value
      const filteredRows = rows.filter((row) => row.Semester === v);
      setRows(filteredRows);
    } else {
      // Reset the rows to the original data
      getForms(userCollege);
    }
  };

  const filterData = (v) => {
    if (v) {
      // Filter the rows based on the selected value
      const filteredRows = rows.filter((row) => row.Program === v);
      setRows(filteredRows);
    } else {
      // Reset the rows to the original data
      getForms(userCollege);
    }
  };
  
  
  const uniqueName = Array.from(new Set(rows.map((rows) => rows.Program)));
  const uniqueSemester = Array.from(new Set(rows.map((rows) => rows.Semester)));

  return (
    <>
      {/* {rows.length > 0 && ( */}
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Transfer Request of Students To go to Come into Our college                        
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
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
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
                        <TableCell align="left">{row.College}</TableCell>
                        <TableCell align="left">{row.Program}</TableCell>
                        <TableCell align="left">{row.Semester}</TableCell>
                        <TableCell align="left">{row.TotalSeats}</TableCell>
                        <TableCell align="left">{row.Seats}</TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <VerifiedIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => {
                                accpetUser(row.id,row.College, row.Program, row.Semester,row.TotalSeats,row.Seats);
                              }}
                            />

                            
                            <CancelIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                rejectUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      {/* )} */}
    </>
  );
}
