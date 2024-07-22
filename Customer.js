import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@material-ui/core';
import {useReactToPrint} from "react-to-print";



const Customer = () => {
    const [customer, setCustomer] = useState([]);
    const [customerSearch, setCustomerSearch] = useState('');

    const ComponentsRef = useRef(); 
    const handlePrint = useReactToPrint({ 
    content: () => ComponentsRef.current, 
    DocumentTitle:"Staff Members Salary Report", 
    onafterprint:()=>alert("Salary Report Successfully Download!") 
  })

    useEffect(() => {
        fetchCustomerDetails();        
    }, []);

    const fetchCustomerDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/user/getAll');
            const customerWithId = response.data.map((customer, index) => ({
                id: index + 1,
                ...customer
            }));
            setCustomer(customerWithId);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }

    };  
    
    
    const handleUpdateEmployee = async (user) => {
        try {
            let updatedStatus;
            if (user.isLoyal  === 'true') {
                updatedStatus = 'false';
            } else {
                updatedStatus = 'true';
            }

            const updatedUser = { ...user, isLoyal : updatedStatus };
            await axios.put(`${global.APIUrl}/user/update`, updatedUser);
            window.location.href = "/Customer";
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    

    const columns = [        
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone Number', width: 250 },
        { field: 'isLoyal', headerName: 'Loyal Status', width: 250 },
        { field: 'points', headerName: 'Loyal Points', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    {params.row.isLoyal === 'true' ? (
                        <IconButton color="error" onClick={() => handleUpdateEmployee(params.row)}>
                            <CloseIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="success" onClick={() => handleUpdateEmployee(params.row)}>
                            <CheckIcon />
                        </IconButton>
                    )}                   
                </div>
            ),
        },
    ];  

    const handleCustomerSearch = () => {
        const filteredCustomer = customer.filter((cus) =>
            cus.name.toLowerCase().includes(customerSearch.toLowerCase())
        );
        setCustomer(filteredCustomer);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', maxWidth: '161vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#ecf0f1', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#1c2331', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Customer Management
                        </Typography>                       
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                    Customer Details
                    </Typography>

                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        style={{ marginBottom: 10 }}
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                    />
                    <Button variant="contained" sx ={{bgcolor:'#B7EBBD', color:'#000000'}} onClick={handleCustomerSearch}>
                        Search
                    </Button>

                    <button onClick={handlePrint}
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
                            Download
                            </button>
                    <div ref={ComponentsRef} style={{ width: '100%' }}>

                    <div style={{ width: '100%' }}>
                        <DataGrid rows={customer} columns={columns} pageSize={5} />
                    </div>
                    </div>
                </div>              
            </div>
        </div>
    );
};

export default Customer;
