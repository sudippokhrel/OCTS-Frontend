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

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const columns = [
  { id: 'name', label: 'College', minWidth: 170 },
  { id: 'program', label: 'Program', minWidth: 100 },
  {
    id: 'semester',
    label: 'Semester',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'seats',
    label: 'no of seats',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, program, semester, seats) {
  return { name, program, semester, seats};
}

const rows = [
  createData('School Of Engineering', 'BE Computer', 1, 48),
  createData('School Of Engineering', 'BE Computer', 2, 48),
  createData('School Of Engineering', 'BE Computer', 3, 48),
  createData('School Of Engineering', 'BE Computer', 4, 48),
  createData('School Of Engineering', 'BE Computer', 5, 48),
  createData('School Of Engineering', 'BE Computer', 6, 48),
  createData('School Of Engineering', 'BE Computer', 7, 48),
  createData('School Of Engineering', 'BE Computer', 8, 48),
  createData('School Of Engineering', 'BE Software', 1, 48),
  createData('School Of Engineering', 'BE Software', 2, 48),
  createData('Pokhara Engineering college', 'BE Software', 3, 48),
  createData('School Of Engineering', 'BE Software', 4, 48),
  createData('School Of Engineering', 'BE Software', 5, 48),
  createData('School Of Engineering', 'BE Software', 6, 48),
  createData('School Of Engineering', 'BE Software', 7, 48),
];

export default function SeatList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filteredRows, setFilteredRows] = React.useState(rows); // State to store the filtered rows

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = (selectedCollege, selectedProgram) => {
    let filteredData = rows;
    
    if (selectedCollege) {
      filteredData = filteredData.filter((row) => row.name === selectedCollege.name);
    }
    
    if (selectedProgram) {
      filteredData = filteredData.filter((row) => row.program === selectedProgram.program);
    }

    setFilteredRows(filteredData);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Search For Seats
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction="row" spacing={2} className="my-2 mb-2">
        <Autocomplete
          disablePortal
          id="combo-box-college"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v, null)}
          getOptionLabel={(row) => row.name || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search College" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-program"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(null, v)}
          getOptionLabel={(row) => row.program || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search Program" />
          )}
        />
      </Stack>

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
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 8, 10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}