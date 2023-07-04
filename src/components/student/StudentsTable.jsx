import * as React from 'react';
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

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useNavigate} from 'react-router-dom';

import Modal from '@mui/material/Modal';
import AddStudent from '../../pages/students/AddStudent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {id:'puRegNumber',label:'Registration Number',minWidth:170},
  {id:'college', label:'College',minWidth:170},
  { id: 'program', label: 'Program', minWidth: 100 },
  {
    id: 'semester',
    label: 'Semester',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'action', label: 'Action', minWidth: 100 },
  
  
];

function createData(name, puRegNumber,college,program, semester,action) {
  return { name,puRegNumber,college, program, semester,action};
}

const rows = [
  createData('Ram Sharma',19070120,'School Of Engineering', 'BE Computer', 1 ),
  createData('kalu ',19070120,'School Of Engineering', 'BE Computer', 2 ),
  createData('don ',19070120,'School Of Engineering', 'BE Computer', 3 ),
  createData('abc ',19070120,'School Of Engineering', 'BE Computer', 4 ),
  createData('Bhatki ',19070120,'School Of Engineering', 'BE Computer', 5 ),
  createData('Ram Shamundra',19070120,'School Of Engineering', 'BE Computer', 6 ),
  createData('sanjay bhansali ',19070120,'School Of Engineering', 'BE Computer', 7 ),
  createData('xyzRam ',19070120,'School Of Engineering', 'BE Computer', 8 ),
  createData('Ram Sharma',19070120,'School Of Engineering', 'BE Software', 1 ),
  createData('Ram Sharma',19070120,'School Of Engineering', 'BE Software', 2),
  createData('Ram Sharma',19070120,'Pokhara Engineering college', 'BE Software', 3),
  createData('Ram Sharma',19070120,'School Of Engineering', 'BE Software', 4),
  createData('Ram Sharma',19070120,'School Of Engineering', 'BE Software', 5),
  createData('Ram Sharma',19070120,'School Of Engineering', 'BE Software', 6),
  createData('Ram Sharma',19070120,'School Of Engineering', 'BE Software', 7),
];

export default function StudentsTable() {

  // for modal to add new students
  const [open, setOpen] = React.useState(false);
  const [filteredRows, setFilteredRows] = React.useState(rows); // State to store the filtered rows
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = (selectedName) => {
    let filteredData = rows;

    if (selectedName) {
      filteredData = filteredData.filter((row) => row.name === selectedName);
    }
    setFilteredRows(filteredData);
    setPage(0);
  };

  const uniqueName = Array.from(new Set(rows.map((row) => row.name)));

  

  return (
  <>

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Students
      </Typography>
      <Divider />
      <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={uniqueName}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v,null)}
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
          <div>
          <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddStudent closeEvent={handleClose} />
        </Box>
      </Modal>
    </div>
          </div>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                        

                      );
                      
                      
                    })}
                    <div>
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
                            // onClick={() => {
                            //   link('/');
                            // }}
                          />
                        </Stack>

                      </div>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,8,10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>


  </>
    
  );
}