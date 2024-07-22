import React, { useState, useEffect,useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import {useReactToPrint} from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const EmployeeManage = () => {
    const [employee, setEmployee] = useState([]);
    const [salary, setSalary] = useState([]);
    const [employeeSearch, setEmployeeSearch] = useState('');
    const [salarySearch, setSalarySearch] = useState('');
    const ComponentsRef = useRef(); 

    const generatePdf = () => {
        const doc = new jsPDF();
        const date = new Date().toLocaleDateString();
        const title ='Employee Salary Report';
        const signature = "Signature: ___________________";


       

        // Add title and date
        doc.setFontSize(16);
        doc.text(title, 14, 20);
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 14, 30);
        doc.text(signature, 14, 40);

        // Add table
        doc.autoTable({
            head: [['Employee ID', 'Employee Name', 'Per Day Salary(Rs.)', 'Working Days', 'Full Salary(Rs.)']],
            body:salary.map((s) => [s.uid, s.name, s.salary, s.days, s.fullSalary]),
            startY: 50,
        });

        // Save the PDF
        doc.save('salary_report.pdf');
    };
    
    useEffect(() => {
        fetchEmployeeDetails();
        fetchSalaryDetails();
        const editBtn = false;
        const data = {
            editBtn
        };
        localStorage.setItem('selectedEmployee', JSON.stringify(data));
    }, []);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/admin/getAll');
            const employeesWithId = response.data.map((employee, index) => ({
                id: index + 1,
                ...employee
            }));
            setEmployee(employeesWithId);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    const fetchSalaryDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/salary/all');
            const salaryWithId = response.data.map((salary, index) => ({
                id: index + 1,
                ...salary
            }));
            setSalary(salaryWithId);
        } catch (error) {
            console.error('Error fetching salary details:', error);
        }
    };

    const handleAddEmployee = () => {
        window.location.href = "/EmployeeForm";
    };

    const handleEditEmployee = (selectedEmployee) => {
        const editBtn = true;
        const data = {
            selectedEmployee,
            editBtn
        };
        localStorage.setItem('selectedEmployee', JSON.stringify(data));
        window.location.href = "/EmployeeForm";
    };

    const handleUpdateEmployee = async (selectedEmployee) => {
        try {
            let updatedStatus;
            if (selectedEmployee.status === 'Activate') {
                updatedStatus = 'Deactivate';
            } else {
                updatedStatus = 'Activate';
            }

            const updatedEmployee = { ...selectedEmployee, status: updatedStatus };
            await axios.put(`${global.APIUrl}/admin/update`, updatedEmployee);

            setEmployee(prevEmployees =>
                prevEmployees.map(employee =>
                    employee.id === selectedEmployee.id ? updatedEmployee : employee
                )
            );
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleDeleteEmployee = (employeeId) => {
        const confirmDelete = window.confirm("Are you sure?");
        axios.delete(global.APIUrl + "/admin/delete/" + employeeId).then(() => {
            alert("Employee Deleted!!");
            window.location.href = "/Employee";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Employee Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })

    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Deactivate':
                return 'red';
            case 'Activate':
                return 'green';
            default:
                return 'black';
        }
    };

    const columns = [
        { field: 'uid', headerName: 'Employee ID', width: 150 },
        { field: 'name', headerName: 'Employee Name', width: 150 },
        { field: 'nic', headerName: 'NIC', width: 150 },
        { field: 'type', headerName: 'Type', width: 100 },
        { field: 'salary', headerName: 'Salary (Per Day)', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phone', headerName: 'Phone No', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    style={{ color: getStatusColor(params.value), borderColor: getStatusColor(params.value) }}
                    disabled
                >
                    {params.value}
                </Button>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    {params.row.status === 'Activate' ? (
                        <IconButton color="error" onClick={() => handleUpdateEmployee(params.row)}>
                            <CloseIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="success" onClick={() => handleUpdateEmployee(params.row)}>
                            <CheckIcon />
                        </IconButton>
                    )}
                    <IconButton color="primary" onClick={() => handleEditEmployee(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteEmployee(params.row.uid)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const column = [
        { field: 'uid', headerName: 'Employee ID', width: 200 },
        { field: 'name', headerName: 'Employee Name', width: 200 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'salary', headerName: 'Per Day Salary(Rs.)', width: 200 },
        { field: 'days', headerName: 'Working Days', width: 200 },
        { field: 'fullSalary', headerName: 'Full Salary(Rs.)', width: 200 },
    ];

    const handleAddSalary = () => {
        window.location.href = "/SalaryForm";
    };

    const handleEmployeeSearch = () => {
        const filteredEmployee = employee.filter((emp) =>
            emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
        );
        setEmployee(filteredEmployee);
    };

    const handleSalarySearch = () => {
        const filteredSalary = salary.filter((sal) =>
            sal.name.toLowerCase().includes(salarySearch.toLowerCase())
        );
        setSalary(filteredSalary);
    };

    return (
        <div style={{ display: 'flex', height: '200vh', maxWidth: '1000vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#B7EBBD', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#EDAF28', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Employee Management
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button variant="contained"  sx ={{bgcolor:'#009637', color:'#ffffff'}} onClick={handleAddEmployee}>
                            Add New Employee
                        </Button>
                        &nbsp;
                        &nbsp;
                        <Button variant="contained" sx ={{bgcolor:'#009637', color:'#ffffff'}} onClick={handleAddSalary}>
                            Salary
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '180vh' }}>
                    <Typography variant="h5" gutterBottom><b>
                        Employee Details</b>
                    </Typography>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        style={{ marginBottom: 10 }}
                        value={employeeSearch}
                        onChange={(e) => setEmployeeSearch(e.target.value)}
                    />
                    <Button variant="contained" sx ={{bgcolor:'#B7EBBD', color:'#000000'}} onClick={handleEmployeeSearch}>
                        Search
                    </Button>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={employee} columns={columns} pageSize={5} />
                    </div>
                </div>
                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '180vh' }} >
                    <Typography variant="h5" gutterBottom><b>
                        Salary Details</b>
                    </Typography>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        style={{ marginBottom: 10 }}
                        value={salarySearch}
                        onChange={(e) => setSalarySearch(e.target.value)}
                    />0
                    <Button variant="contained" sx ={{bgcolor:'#B7EBBD', color:'#000000'}} onClick={handleSalarySearch}>
                        Search
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    
                    <button onClick={generatePdf}
                             style={{
                                backgroundColor: '#37a2d7',
                                color: '#ffffff',
                                padding: '10px', 
                                variant : "contained",
                                border: 'none', 
                                borderRadius: '5px', 
                                
                            }}
                            >
                            <i className="fas fa-download" style={{ marginRight: '8px'}}></i> 
                            Download Report
                            </button>
                    <div ref={ComponentsRef} style={{ width: '100%' }}>
                        <DataGrid rows={salary} columns={column} pageSize={5} />
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default EmployeeManage;