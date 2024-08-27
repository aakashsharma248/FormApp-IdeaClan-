import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';

const FormComponent = ({ addRow, updateRow, currentEditRow }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    department: '',
    email: '',
    salary: '',
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // Effect to populate form with data when editing
  useEffect(() => {
    if (currentEditRow) {
      setFormData(currentEditRow);
    }
  }, [currentEditRow]);

  // Handle changes in form input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form inputs
  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.age || isNaN(formData.age)) tempErrors.age = "Valid age is required";
    if (!formData.gender) tempErrors.gender = "Gender selection is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (currentEditRow) {
        updateRow(currentEditRow.id, formData); // Update existing row
      } else {
        addRow(formData); // Add new row
      }
      setFormData({ name: '', age: '', gender: '', department: '', email: '', salary: '' });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        error={!!errors.age}
        helperText={errors.age}
        fullWidth
        margin="normal"
        type="number" // Set input type for numeric value
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        {errors.gender && <div style={{ color: "red", marginTop: "-10px" }}>{errors.gender}</div>}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Select
          name="department"
          value={formData.department}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>Select Department</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        margin="normal"
        type="email" // Set input type for email
      />
      <TextField
        label="Salary"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number" // Set input type for numeric value
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {currentEditRow ? 'Update' : 'Submit'}
      </Button>
    </form>
  );
};

export default FormComponent;
