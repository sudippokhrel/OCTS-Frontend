import * as React from 'react';
import { useState } from 'react';
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
import Modal from '@mui/material/Modal';

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddDirectors from '../../../pages/directors/AddDirectors';



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

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {id:'college', label:'College',minWidth:170},
  { id: 'address', label: 'Address', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 100 },
  
  
];

function createData(name, college,address, action) {
  return { name, college,address, action};
}

const rows = [
  createData('Ram Sharma','School Of Engineering', 'Dhungepatan,Pokhara'),
  createData('kalu ','Madan Bhandari Memorial Academy Nepal', 'Urlabari-3, Morang' ),
  createData('don ','Nepal Engineering College', 'Changunarayan, Bhaktapur' ),
  createData('abc ','School of Environmental Science & Management (SchEMS)', ' Mid Baneshwor, Kathmandu' ),
  createData('Bhatki ','Gandaki College of Engineering and Science', 'Lamachaur, Pokhara-16' ),
  createData('Ram Shamundra','Universal Engineering College',' Chakupat, Lalitpur' ),
  createData('xyzRam ','Crimson College of Technology', 'Devinagar, Rupandehi'),
  createData('Ram Sharma','Oxford College of Engineering and Management', 'Gaidakot,Nawalparasi'),
  createData('Ram Sharma','Lumbini Engineering, Management and Science College', 'Bhalwari, Butwal, Rupandehi'),
  createData('Ram Sharma','Pokhara Engineering college', 'Firke, Pokhara'),
  createData('Ram Sharma','National Academy of Science and Technology Dhangadi', 'Kailali'),
  createData('Ram Sharma','Nepal College of Information Technology', 'Balkumari, Lalitpur'),
  createData('Ram Sharma','Cosmos College of Management and Technology', 'Tutepani-14, Lalitpur'),



];

export default function DirectorsTable() {

  const [filteredRows, setFilteredRows] = React.useState(rows); // State to store the filtered rows
  // for modal to add new directors

  const [open, setOpen] = useState(false);
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
      filteredData = filteredData.filter((row) => row.college === selectedName);
    }
    setFilteredRows(filteredData);
    setPage(0);
  };

  const uniqueName = Array.from(new Set(rows.map((row) => row.college)));

  

  return (
  <>

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Directors
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
                <TextField {...params} size="small" label="Search Director of" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button onClick={handleOpen} variant="contained" endIcon={<AddCircleIcon />}  >
              Add
            </Button>
            
            
          </Stack>
      <div>
          
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
          <AddDirectors closeEvent={handleClose} />
          </Box>
        </Modal>
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

