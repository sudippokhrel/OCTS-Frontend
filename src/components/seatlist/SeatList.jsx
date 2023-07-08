import { useEffect, useState } from "react";
import React from "react";
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
} from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SeatsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // State to hold the filtered rows
  const empCollectionRef = collection(db, "seats");
  // to find selected college
  const [selectedCollege, setSelectedCollege] = React.useState(null);
  const [selectedProgram, setSelectedProgram] = React.useState(null);
  const [selectedSemester, setSelectedSemester] = React.useState(null);

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = async () => {
    const data = await getDocs(empCollectionRef);
    const fetchedRows = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setRows(fetchedRows);
    setFilteredRows(fetchedRows); // Initialize filtered rows with the original dataset
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleProgramChange = (event, value) => {
    setSelectedProgram(value);
  };

  const filterData = (selectedCollege, selectedProgram, selectedSemester) => {
    let filteredData = rows; // Start with the original dataset

    if (selectedCollege) {
      // Filter the rows based on the selected value
      filteredData = filteredData.filter(
        (row) => row.College === selectedCollege
      );
    }

    if (selectedProgram) {
      // Filter the rows based on the selected value
      filteredData = filteredData.filter(
        (row) => row.Program === selectedProgram
      );
    }

    if (selectedSemester) {
      // Filter the rows based on the selected value
      filteredData = filteredData.filter(
        (row) => row.Semester === selectedSemester
      );
    }

    setFilteredRows(filteredData); // Update the filtered rows
    setPage(0);
  };

  const uniqueName = Array.from(
    new Set(rows.map((rows) => rows.College))
  );
  const uniqueProgram = Array.from(
    new Set(rows.map((rows) => rows.Program))
  );
  const uniqueSemester = Array.from(
    new Set(rows.map((rows) => rows.Semester))
  );

  return (
    <>
      {rows.length > 0 && (
        <Paper
          sx={{ width: "98%", overflow: "hidden", padding: "12px" }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Students Seat List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={uniqueName}
              sx={{ width: 300 }}
              onChange={(e, v) => setSelectedCollege(v)}
              getOptionLabel={(row) => row || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Search College"
                />
              )}
            />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={uniqueProgram}
              sx={{ width: 300 }}
              onChange={handleProgramChange}
              getOptionLabel={(row) => row || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Search Programs"
                />
              )}
            />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={uniqueSemester}
              sx={{ width: 300 }}
              onChange={(e, v) => setSelectedSemester(v)}
              getOptionLabel={(row) => row || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Search Semester"
                />
              )}
            />

            <button
              onClick={() =>
                filterData(selectedCollege, selectedProgram, selectedSemester)
              }
            >
              Search
            </button>
          </Stack>

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
                    Seats
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
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
                        <TableCell align="left">{row.Seats}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
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
          
