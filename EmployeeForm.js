import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddNewEmployeeForm = () => {
  const [newEmployee, setNewEmployee] = useState({
    uid: 'E' + generateId(),
    name: '',
    nic: '',
    status: 'Deactivate',
    email: '',
    phone: '',
    password: '',
    type: 'Employee',
    salary: '',
  });

  const info = JSON.parse(localStorage.getItem('selectedEmployee')) || {};
  const [errors, setErrors] = useState({});
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicError, setNicError] = useState('');

  useEffect(() => {
    if (info.editBtn) {
      setNewEmployee(info.selectedEmployee);
    }
  }, [info.editBtn, info.selectedEmployee]);

  function generateId() {
    let id = '';
    for (let i = 0; i < 9; i++) {
        id += Math.floor(Math.random() * 10);
    }
    return id;
}
;

  const handleSalaryChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setNewEmployee({ ...newEmployee, salary: value });
      setErrors((prev) => ({ ...prev, salary: '' }));
    } else {
      setNewEmployee({ ...newEmployee, salary: '' });
      setErrors((prev) => ({ ...prev, salary: 'Salary must be a non-negative number' }));
    }
  };

  const validateNIC = (nic) => {
    const regex = /^(?:\d{12}|\d{11}[Vv])$/;
    return regex.test(nic);
  };

  const handleNameChange = (value) => {
    setNewEmployee({ ...newEmployee, name: value });
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      setNameError('Name should contain only letters.');
    } else {
      setNameError('');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setNewEmployee({ ...newEmployee, phone: value });

    if (!/^\d{10}$/.test(value)) {
      setPhoneError('Phone number must be exactly 10 digits');
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setNewEmployee({ ...newEmployee, email: value });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewEmployee({ ...newEmployee, password: value });

    if (value.length < 8 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
      setPasswordError('Password must be at least 8 characters, with one digit and one letter');
    } else {
      setPasswordError('');
    }
  };


  const handleAddEmployee = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(`${global.APIUrl}/admin/register`, newEmployee);

        if (response.data.message === 'Email is Already Used') {
          Swal.fire({
            title: 'Error!',
            text: 'Email Already Taken',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Success!',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            window.location.href = '/Employee';
          });
        }
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: 'Registration Not Successful',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please correct the form errors before submitting.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!newEmployee.name.trim() || !/^[a-zA-Z\s]*$/.test(newEmployee.name)) {
      newErrors.name = 'Name should contain only letters';
      isValid = false;
    }

    
    if (!newEmployee.nic.trim() || !validateNIC(newEmployee.nic)) {
       newErrors.nic = 'NIC must be 12 digits or 11 digits followed by V or v';
      isValid = false;
      }

    if (!newEmployee.nic.trim()) {
      newErrors.nic = 'NIC is required';
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!/^\d{10}$/.test(newEmployee.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
      isValid = false;
    }

    if (newEmployee.password.length < 8 || !/\d/.test(newEmployee.password) || !/[a-zA-Z]/.test(newEmployee.password)) {
      newErrors.password = 'Password must be at least 8 characters long, with one digit and one letter';
      isValid = false;
    }

    if (newEmployee.salary === '' || newEmployee.salary < 0) {
      newErrors.salary = 'Salary must be a non-negative number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEditEmployee = async () => {
    if (validateForm()) {
      try {
        await axios.put(`${global.APIUrl}/admin/update`, newEmployee);

        Swal.fire({
          title: 'Success!',
          text: 'Employee updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.href = '/Employee';
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update Employee.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please correct the form errors before updating.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleCancel = () => {
    window.location.href = '/Employee';
  };

  return (
    <div style={{ height: '150vh', paddingTop: '64px', backgroundColor: '#B7EBBD' }}>
      <AppBar position="fixed" style={{ backgroundColor: '#EDAF28', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
            {info.editBtn ? 'Edit Employee' : 'Add New Employee'}
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            variant="contained"
            color={info.editBtn ? 'primary' : 'success'}
            onClick={info.editBtn ? handleEditEmployee : handleAddEmployee}
          >
            {info.editBtn ? 'Edit Employee' : 'Add Employee'}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCancel}
            style={{ marginLeft: '8px' }}
          >
            Cancel
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                {info.editBtn ? 'Edit Employee' : 'Add New Employee Form'}
              </Typography>
              <hr />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Employee ID"
                fullWidth
                value={newEmployee.uid}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={newEmployee.name}
                onChange={(e) => handleNameChange(e.target.value)}
                error={!!nameError}
                helperText={nameError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="NIC"
                fullWidth
                value={newEmployee.nic}
                onChange={(e) => {
                  setNewEmployee({ ...newEmployee, nic: e.target.value });
                  if (!validateNIC(e.target.value)) {
                    setNicError('NIC must be 12 digits or 11 digits followed by V or v');
                  } else {
                    setNicError('');
                  }
                }}
                error={!!nicError}
                helperText={nicError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Salary (Per Day)"
                fullWidth
                value={newEmployee.salary}
                onChange={handleSalaryChange}
                error={!!errors.salary}
                helperText={errors.salary}
                type="number"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={newEmployee.email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                disabled={info.editBtn}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Phone"
                fullWidth
                value={newEmployee.phone}
                onChange={(e) => handlePhoneChange(e)}
                error={!!phoneError}
                helperText={phoneError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                value={newEmployee.password}
                onChange={(e) => handlePasswordChange(e)}
                error={!!passwordError}
                helperText={passwordError}
                disabled={info.editBtn}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default AddNewEmployeeForm;
