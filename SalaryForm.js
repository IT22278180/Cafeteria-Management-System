import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, Typography, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const SalaryForm = () => {
    const [newSalary, setNewSalary] = useState({
        uid: '',
        name: '',
        date: '',
        days: '',
        salary: '',
        fullSalary: 0
    });

    const [errors, setErrors] = useState({});
    const [nameError, setNameError] = useState("");
    const [dateError, setDateError] = useState("");
    

    // Validation function to check if the input contains only letters
    const validateName = (value) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(value);
    };

    const handleNameChange = (value) => {
        setNewSalary({ ...newSalary, name: value });
        if (!validateName(value)) {
            setNameError("Name should contain only letters.");
        } else {
            setNameError("");
        }
    };

    const handleSalaryChange = (e) => {
        const value = parseFloat(e.target.value);
        // Allow only non-negative numbers
        if (!isNaN(value) && value >= 0) {
            setNewSalary({ ...newSalary, salary: value });
            setErrors({ ...errors, salary: '' });
        } else {
            // If the value is negative, reset the field to empty and show an error message
            setNewSalary({ ...newSalary, salary: '' });
            setErrors({ ...errors, salary: 'Salary must be a non-negative number' });
        }
    };

    const handleWorkingdaysChange = (e) => {
        const value = parseInt(e.target.value);
        // Allow only non-negative numbers
        if (!isNaN(value) && value >= 0) {
            setNewSalary({ ...newSalary, days: value });
            setErrors({ ...errors, days: '' });
        } else {
            // If the value is negative, reset the field to empty and show an error message
            setNewSalary({ ...newSalary, days: '' });
            setErrors({ ...errors, days: 'Working must be a non-negative number' });
        }
    };

    const validateDate = (value) => {
        const selectedDate = new Date(value);
        const currentDate = new Date();
        // Check if the selected date is the current day
        return selectedDate.toDateString() === currentDate.toDateString();
    };

    const handleDateChange = (value) => {
        setNewSalary({ ...newSalary, date: value });
        if (!validateDate(value)) {
            setDateError("Please select a current date.");
        } else {
            setDateError("");
        }
    };

    const handleAddSalary = async () => {
        if (validateForm()) {
            try {
                await axios.post(global.APIUrl + '/salary/add', newSalary);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Salary added successfully'
                }).then(() => {
                    window.location.href = "/Employee";
                });
            } catch (error) {
                console.error('Error adding salary:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error adding salary'
                }).then(() => {
                    window.location.href = "/SalaryForm";
                });
            }           
        }
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newSalary.uid) {
            errors.uid = 'Employee ID is required';
            isValid = false;
        }

        // Validate name
        if (!newSalary.name) {
            errors.name = 'Name is required';
            isValid = false;
        } else if (!validateName(newSalary.name)) {
            errors.name = 'Name should contain only letters';
            isValid = false;
        }

        // Salary validation
        if (!newSalary.salary) {
            errors.salary = 'Salary is required';
            isValid = false;
        } 

        

        // Working Days validation
        if (!newSalary.days || newSalary.days < 0) {
            errors.days = 'Per Day Salary must be a non-negative number';
            isValid = false;
        } 

        // Working Days validation
        if (!newSalary.days) {
            errors.days = 'Working Days is required';
            isValid = false;
        } 

        if (!newSalary.date) {
            errors.date = 'Date is required';
            isValid = false;
        } else if (!validateDate(newSalary.date)) {
            errors.date = 'Please select a recent date';
            isValid = false;
        }
        
        setErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        window.location.href = "/Employee";
    };

    useEffect(() => {
        const calculateSalary = () => {
            setNewSalary({ ...newSalary, fullSalary: newSalary.salary * newSalary.days });
        };
        calculateSalary();
    }, [newSalary.salary, newSalary.days]);

    return (
        <div style={{ height: '150vh', paddingTop: '64px', backgroundColor: '#B7EBBD' }}>
            <AppBar position="fixed" style={{ backgroundColor: '#EDAF28', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Add Employee Salary
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button variant="contained" sx ={{bgcolor:'#009637', color:'#ffffff'}} onClick={handleAddSalary}>
                        Add
                    </Button>
                    <Button variant="contained" color="error" onClick={handleCancel} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                Employee Salary Calculate Form
                            </Typography>
                            <hr />
                            <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                Calculated Salary: Rs.{newSalary.fullSalary}
                            </Typography>
                            <hr />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Employee ID"
                                fullWidth
                                placeholder='A4562'
                                value={newSalary.uid}
                                onChange={(e) => setNewSalary({ ...newSalary, uid: e.target.value })}
                                error={!!errors.uid}
                                helperText={errors.uid}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={newSalary.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                required
                                error={!!errors.name || !!nameError}
                                helperText={errors.name || nameError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date"
                                fullWidth
                                value={newSalary.date}
                                onChange={(e) => handleDateChange(e.target.value)}
                                error={!!errors.date || !!dateError}
                                helperText={errors.date || dateError}
                                type='date'
                                focused
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Per Day Salary"
                                fullWidth
                                value={newSalary.salary}
                                onChange={handleSalaryChange}
                                error={!!errors.salary}
                                helperText={errors.salary}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Working Days"
                                fullWidth
                                value={newSalary.days}
                                onChange={handleWorkingdaysChange}
                                error={!!errors.days }
                                helperText={errors.days }
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default SalaryForm;
