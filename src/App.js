import React, { useState, useCallback } from 'react';
import FormComponent from './Component/FormComponent';
import TableComponent from './Component/TableComponent';
import { Container, Typography } from '@mui/material';

const App = () => {
  // State to store table rows data
  const [rows, setRows] = useState([
    { id: 1, name: 'Aakash Sharma', age: 23, gender: 'male', department: 'Engineering', email: 'aakash@example.com', salary: 5000 },
    { id: 2, name: 'Jane Smith', age: 34, gender: 'female', department: 'Finance', email: 'jane@example.com', salary: 4000 },
  ]);

  // State to manage the current row being edited
  const [currentEditRow, setCurrentEditRow] = useState(null);

  // Callback to add a new row to the table
  const addRow = useCallback((data) => {
    setRows((prevRows) => [...prevRows, { ...data, id: prevRows.length + 1 }]);
  }, []);

  // Callback to update an existing row in the table
  const updateRow = useCallback((id, updatedData) => {
    setRows((prevRows) => prevRows.map(row => (row.id === id ? { ...row, ...updatedData } : row)));
    setCurrentEditRow(null); // Reset edit mode after updating
  }, []);

  // Callback to delete a row from the table
  const deleteRow = useCallback((id) => {
    setRows((prevRows) => prevRows.filter(row => row.id !== id));
  }, []);

  // Callback to copy a row and add it as a new row
  const copyRow = useCallback((id) => {
    const rowToCopy = rows.find(row => row.id === id);
    if (rowToCopy) {
      const newRow = { ...rowToCopy, id: rows.length + 1 };
      setRows((prevRows) => [...prevRows, newRow]);
    }
  }, [rows]);

  // Function to set the row for editing
  const handleEdit = (id) => {
    const rowToEdit = rows.find(row => row.id === id);
    setCurrentEditRow(rowToEdit);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" style={{ marginTop: '2%' }}>
        React Form Validation App
      </Typography>
      <FormComponent addRow={addRow} updateRow={updateRow} currentEditRow={currentEditRow} />
      <TableComponent data={rows} updateRow={handleEdit} deleteRow={deleteRow} copyRow={copyRow} />
    </Container>
  );
};

export default App;
