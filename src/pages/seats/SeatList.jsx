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
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddSeats from "./AddSeats";
import Modal from '@mui/material/Modal';
import EditSeats from "./EditSeats";

// Role based  add option
import { useUserAuth } from '../../components/context/UserAuthContext';
import getUserRole from '../../components/users/getUserRole';
import getUserCollege from '../../components/users/getUserCollege';
import getUserProgram from '../../components/users/getUserProgram';

// Style for modal 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function SeatsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);  
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // for modal to add new directors
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    getSeats(); // Fetch the updated data
  };

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
          getSeats(college,program);
        } else {
          // Fetch seats for admin
          getSeats();
        }

        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      if (userRole === "admin"|| userRole== "dean") {
        getSeats();
      } else {
        getSeats(userCollege,userProgram);
      }
    }
  }, [userRole, userCollege,userProgram, isLoading]);

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    getSeats(userCollege,userProgram); // Fetch the updated data
  };
  // for Edit form
  const [formid, setFormid] = useState("");  


  // useEffect(() => {
  //   if (!isLoading) {
  //   if(userRole=='admin'){
  //     getSeats();
  //   }else{
  //     getSeats(userCollege);
  //   }
  // }
    
  // }, []);

  const getSeats = async (userCollege,userProgram) => {

    const empCollectionRef = collection(db, "seats");
    if (userRole=='admin' || userRole=='dean'){
      const q = query(empCollectionRef); // Use query() function here
      const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);
    }else if (userRole=='college_head'){
      const q = query(empCollectionRef, where("College", "==", userCollege)); // Use query() function here
    const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);

    }
    else if (userRole=='program_coordinator'){
      const q = query(empCollectionRef, where("College", "==", userCollege),
      where("Program", "==", userProgram)); // Use query() function here
    const data = await getDocs(q);
    const fetchedRows = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRows(fetchedRows);
    }

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const EditData =(id,College,Program,Semester,TotalSeats,Seats) =>{
    const editdata ={
      id: id,
      College:College,
      Program: Program,
      Semester: Semester,
      TotalSeats: TotalSeats,
      Seats: Seats,

    };
    setFormid(editdata);
    handleEditOpen();
  }

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
    const userDoc = doc(db, "seats", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your Seat Data has been deleted.", "success");
    getSeats();
  };

  const filterDataSemester = (v) => {
    if (v) {
      // Filter the rows based on the selected value
      const filteredRows = rows.filter((row) => row.Semester === v);
      setRows(filteredRows);
    } else {
      // Reset the rows to the original data
      getSeats(userCollege);
    }
  };

  const filterData = (v) => {
    if (v) {
      // Filter the rows based on the selected value
      const filteredRows = rows.filter((row) => row.Program === v);
      setRows(filteredRows);
    } else {
      // Reset the rows to the original data
      getSeats(userCollege);
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
            Students Seat List                         <br></br>  {userCollege} <br></br>
            {userProgram}
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
            
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            

            {userRole=='admin'  &&(   // the add seat button is seen only if the user is admin
            <Button onClick={handleOpen} variant="contained" endIcon={<AddCircleIcon />}>
              Add
            </Button>
            )}
          </Stack>

          {/* to add seats of respective college we have used model */}
          <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
          <AddSeats closeEvent={handleClose} /> {/*here AddSeats is component*/}
          </Box>
        </Modal>

        <Modal
          open={editopen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
          <EditSeats closeEditEvent={handleEditClose} fid ={formid} /> {/*here EditSeats is component*/}
          </Box>
        </Modal>


          <Box height={10} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
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
                    Total Seats
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Filled Seats
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
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => {
                                EditData(row.id,row.College, row.Program, row.Semester,row.TotalSeats,row.Seats);
                              }}
                            />

                            {userRole=='admin'  &&( // detele seat icon is only seen if the user is admin
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
                            )}
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
