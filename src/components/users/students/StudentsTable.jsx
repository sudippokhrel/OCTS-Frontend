import * as React from 'react';
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useNavigate} from 'react-router-dom';

import Modal from '@mui/material/Modal';
import AddStudent from '../../../pages/students/AddStudent';
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
// Role based  add option
import { useUserAuth } from '../../context/UserAuthContext';
import getUserRole from '../getUserRole';
import getUserCollege from '../getUserCollege';
import getUserProgram from '../getUserProgram';

export default function StudentsTable() {

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "users");

  const {  user} = useUserAuth();//to display the profile bar according to user
  const [userRole, setUserRole] = React.useState(null);
  const [userCollege, setUserCollege] = React.useState(null);
  const [userProgram, setUserProgram] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const role = await getUserRole(user.uid);
        const program = await getUserProgram(user.uid);
        setUserProgram(program);
        setUserRole(role);

        if (role !== "admin" || role != "dean") {
          const college = await getUserCollege(user.uid);
          const program = await getUserProgram(user.uid);
          setUserCollege(college);
          setUserProgram(program);

          // Fetch seats based on userCollege here
          getUsers(college,program);
        } else {
          // Fetch seats for admin
          getUsers();
        }

        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);
  console.log("userCollege:", userCollege);
  console.log("userProgram:", userProgram);
  console.log("userRole:", userRole);

  useEffect(() => {
    if (!isLoading) {
      if (userRole === "admin"|| userRole== "dean") {
        getUsers();
      } else {
        getUsers(userCollege,userProgram);
      }
    }
  }, [userRole, userCollege,userProgram, isLoading]);

  const getUsers = async (userCollege,userProgram) => {

    const empCollectionRef = collection(db, "users");
    if (userRole=='admin' || userRole=='dean'){
      const q = query(empCollectionRef, where("role","==", "student")); // Use query() function here
      const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);
    }else if (userRole=='college_head'|| userRole=='director'){
      const q = query(empCollectionRef, where("role","==", "student"), where("college", "==", userCollege)); // Use query() function here
    const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);

    }
    else if (userRole=='program_coordinator'|| userRole=='coordinator'){
      const q = query(empCollectionRef, where("role","==", "student"),  where("college", "==", userCollege), where("program","==",userProgram)
      ); // Use query() function here
      console.log("User Program is", userProgram);
    const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);
    }

  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers(userCollege, userProgram);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = (v) => {
    if (v) {
      // Filter the rows based on the selected value
      const filteredRows = rows.filter((row) => row.name === v);
      setRows(filteredRows);
    } else {
      // Reset the rows to the original data
      getUsers(userCollege, userProgram);
    }
  };

  const uniqueName = Array.from(new Set(rows.map((row) => row.name)));

  

  return (
  <>

  {rows.length > 0 && (

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            {userCollege}     {userProgram} <br></br>
            Students List
            
      </Typography>
      <Divider />
      <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={uniqueName}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(row) => row || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Student" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={()=>{navigate("new")}}>
              Add
            </Button>
            
            
          </Stack>

          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Registration No
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    College
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Program
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Semester
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
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.puRegNumber}</TableCell>
                        <TableCell align="left">{row.college}</TableCell>
                        <TableCell align="left">{row.program}</TableCell>
                        <TableCell align="left">{row.semester}</TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              // onClick={() => editUser(row.id)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
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
        rowsPerPageOptions={[5,8,10, 25, 100]}
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