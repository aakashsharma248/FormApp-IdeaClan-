import React, { useState, useMemo} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, TablePagination } from '@mui/material';
import { Delete, Edit, ContentCopy } from '@mui/icons-material';
import { Typography } from '@mui/material';


const TableComponent = ({ data, updateRow, deleteRow, copyRow }) => {
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // State for sorting configuration
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  // Memoized sorted data based on sortConfig
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Memoized filtered data based on search term
  const filteredData = useMemo(() => {
    return sortedData.filter(row => 
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm]);

  // Memoized paginated data based on page and rowsPerPage
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Calculate total salary for summary row
  const totalSalary = useMemo(() => {
    return data.reduce((total, item) => total + Number(item.salary), 0);
  }, [data]);

  // Request sorting by a specific key
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
     <Typography variant="h4" component="h1" align="center" style={{ marginTop: '10%' }}>
        Form Data In Tabular Format
      </Typography>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => requestSort('name')}>Name</TableCell>
              <TableCell onClick={() => requestSort('age')}>Age</TableCell>
              <TableCell onClick={() => requestSort('gender')}>Gender</TableCell>
              <TableCell onClick={() => requestSort('department')}>Department</TableCell>
              <TableCell onClick={() => requestSort('email')}>Email</TableCell>
              <TableCell onClick={() => requestSort('salary')}>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.salary}</TableCell>
                <TableCell>
                  <IconButton onClick={() => updateRow(row.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteRow(row.id)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => copyRow(row.id)}>
                    <ContentCopy />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={6} align="right">Total Salary</TableCell>
              <TableCell>{totalSalary}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableComponent;
