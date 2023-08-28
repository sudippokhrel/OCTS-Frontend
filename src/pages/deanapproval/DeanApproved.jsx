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
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db, storage } from "../../firebase-config";
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



// Role based  add option
import { useUserAuth } from '../../components/context/UserAuthContext';
import getUserRole from '../../components/users/getUserRole';


export default function DeanApproved() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [rows, setRows] = useState([]);  
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const {  user} = useUserAuth();//to display the profile bar according to user
  const [userRole, setUserRole] = React.useState(null);

  

  useEffect(() => {

    const fetchData = async () => {
      if (user) {
        const role = await getUserRole(user.uid);
        setUserRole(role);

        setIsLoading(false);
      }
      if (!isLoading) {
        if (userRole === "admin" || userRole== "dean") {
          getForms();
        }
        
      }
    };
    fetchData();

  }, [user,userRole, isLoading]);

  // useEffect(() => {
    
  // }, [userRole, userCollege,userProgram, isLoading]);



  const getForms = async () => {

    const empCollectionRef = collection(db, "TransferApplications");
          console.log("user isloading inside is :",isLoading);
          console.log("userRole is ", userRole);


    // Enter the Logic here to render the Application Forms


    if (userRole=='admin' || userRole=='dean'){
      const q = query(empCollectionRef, where("deanStatus", "==", 'Approved by Dean')); // Use query() function here
      const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);
    }else {
      console.log(" Yo are not dean and can't access the data")
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
      getForms();
    }
  };

  const filterData = (v) => {
    if (v) {
      // Filter the rows based on the selected value
      const filteredRows = rows.filter((row) => row.program === v);
      setRows(filteredRows);
    } else {
      // Reset the rows to the original data
      getForms();
    }
  };
  
  
  const uniqueName = Array.from(new Set(rows.map((rows) => rows.program)));
  const uniqueSemester = Array.from(new Set(rows.map((rows) => rows.semester)));

  return (
    <>
      {/* {rows.length > 0 && ( */}
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "15px" }}
          >
            Sucessful Transfers                     
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

              {/* {userRole == "program_coordinator" && ( */}
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

            {/* )} */}
            
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
      {/* )}  */}
    </>
  );
}