import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button } from '@mui/material';
import {useReactToPrint} from "react-to-print";


const OrderPaymentManage = () => {
    const [paidorder, setPaidOrder] = useState([]);
    const [codorder, setCodOrder] = useState([]);
    const [paymentSearch, setPaymentSearch] = useState('');
    const [codSearch, setCodSearch] = useState('');
    const ComponentsRef = useRef(); 
    const handlePrint = useReactToPrint({ 
    content: () => ComponentsRef.current, 
    DocumentTitle:"Orders Report", 
    onafterprint:()=>alert("Orders Report Successfully Download!") 
  })

    useEffect(() => {
        fetchPaidOrderDetails();
        fetchCodOrderDetails();
    }, []);

    const fetchPaidOrderDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/payOrder/allPaidOrders');
            const orderWithId = response.data.map((order, index) => ({
                id: index + 1,
                ...order
            }));
            setPaidOrder(orderWithId);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    }

    const fetchCodOrderDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/codOrder/allOrders');
            const orderWithId = response.data.map((order, index) => ({
                id: index + 1,
                ...order
            }));
            setCodOrder(orderWithId);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    }

    const handleEditPaid = async (Order, newStatus) => {
        switch (newStatus) {
            case 'Processing':
                Order.status = newStatus;
                break;
            case 'Accept':
                Order.status = newStatus;
                break;
            case 'Reject':
                Order.status = newStatus;
                break;
            case 'Cooking':
                Order.status = newStatus;
                break;
            case 'Delivering':
                Order.status = newStatus;
                break;
            case 'Completed':
                Order.status = newStatus;
                break;
            default:
                Order.status = 'Unknown status';
                break;
        }

        await axios.put(global.APIUrl + '/payOrder/updatePaidOrder', Order).then(() => {
            window.location.href = "/OrderPaymentManage";
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Order Not Updated",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        });

    };

    const handleEditCod = async (Order, newStatus) => {
        switch (newStatus) {
            case 'Processing':
                Order.status = newStatus;
                break;
            case 'Accept':
                Order.status = newStatus;
                break;
            case 'Reject':
                Order.status = newStatus;
                break;
            case 'Cooking':
                Order.status = newStatus;
                break;
            case 'Delivering':
                Order.status = newStatus;
                break;
            case 'Completed':
                Order.status = newStatus;
                break;
            default:
                Order.status = 'Unknown status';
                break;
        }

        await axios.put(global.APIUrl + '/codOrder/updateOrder', Order).then(() => {
            window.location.href = "/OrderPaymentManage";
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Order Not Updated",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        });

    };

                
                


    async function handleDeletePaid(orderID) {
                await axios.delete(global.APIUrl + "/payOrder/deletePaidOrder/" + orderID).then(() => {
                    window.location.href = "/OrderPaymentManage";

                }).catch((err) => {
                    Swal.fire({
                        title: "Error!",
                        text: "Order Not Delete",
                        icon: 'error',
                        confirmButtonText: "OK",
                        type: "success"
                    });
                });

            }

    const handleDeleteCod = async (orderID) => {
        await axios.delete(global.APIUrl + "/codOrder/deleteOrder/" + orderID).then(() => {
            window.location.href = "/OrderPaymentManage";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Order Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })

    };

    const columns = [
        { field: 'orderID', headerName: 'Order ID', width: 140 },
        { field: 'orderItems', headerName: 'Items', width: 350 },
        { field: 'totalPrice', headerName: 'Price (LKR)', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => (
                <button
                    variant="outlined"
                    style={{ color: getStatusColor(params.value), borderColor: getStatusColor(params.value) }}
                    disabled
                >
                    {params.value}
                </button>
            ),
        },
        { field: 'address', headerName: 'Address', width: 180 },
        { field: 'city', headerName: 'City', width: 140 },
        { field: 'postalCode', headerName: 'Postal Code', width: 140 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 140 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => (
                <div>                   
                    <IconButton style={{ color: 'green' }} onClick={() => handleEditPaid(params.row, 'Accept')}>
                    <CheckCircleIcon />
                </IconButton>
                <IconButton style={{ color: 'red' }} onClick={() => handleEditPaid(params.row, 'Reject')}>
                    <CancelIcon />
                </IconButton>
                <IconButton style={{ color: 'orange' }} onClick={() => handleEditPaid(params.row, 'Cooking')}>
                    <RestaurantIcon />
                </IconButton>
                <IconButton style={{ color: 'purple' }} onClick={() => handleEditPaid(params.row, 'Delivering')}>
                    <LocalShippingIcon />
                </IconButton>
                <IconButton style={{ color: 'green' }} onClick={() => handleEditPaid(params.row, 'Completed')}>
                    <DoneIcon />
                </IconButton>
                {(params.row.status === 'Reject' && (<IconButton style={{ color: 'black' }} onClick={() => handleDeletePaid(params.row.orderID)}>
                    <DeleteIcon />
                </IconButton>))}
                </div>
            ),
        },
    ];


    const column = [
        { field: 'orderID', headerName: 'Order ID', width: 140 },
        { field: 'orderItems', headerName: 'Items', width: 350 },
        { field: 'totalPrice', headerName: 'Price (LKR)', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => (
                <button
                    variant="outlined"
                    style={{ color: getStatusColor(params.value), borderColor: getStatusColor(params.value) }}
                    disabled
                >
                    {params.value}
                </button>
            ),
        },
        { field: 'address', headerName: 'Address', width: 180 },
        { field: 'city', headerName: 'City', width: 140 },
        { field: 'postalCode', headerName: 'Postal Code', width: 140 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 140 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => (
                <div>
                 <IconButton style={{ color: 'green' }} onClick={() => handleEditCod(params.row, 'Accept')}>
                        <CheckCircleIcon />
                    </IconButton>
                    <IconButton style={{ color: 'red' }} onClick={() => handleEditCod(params.row, 'Reject')}>
                        <CancelIcon />
                    </IconButton>
                    <IconButton style={{ color: 'orange' }} onClick={() => handleEditCod(params.row, 'Cooking')}>
                        <RestaurantIcon />
                    </IconButton>
                    <IconButton style={{ color: 'purple' }} onClick={() => handleEditCod(params.row, 'Delivering')}>
                        <LocalShippingIcon />
                    </IconButton>
                    <IconButton style={{ color: 'green' }} onClick={() => handleEditCod(params.row, 'Completed')}>
                        <DoneIcon />
                    </IconButton>
                    {(params.row.status === 'Reject' && (<IconButton style={{ color: 'black' }} onClick={() => handleDeleteCod(params.row.orderID)}>
                        <DeleteIcon />
                    </IconButton>))}
            </div>
            ),
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing':
                return 'blue';
            case 'Accept':
                return 'green';
            case 'Reject':
                return 'red';
            case 'Cooking':
                return 'orange';
            case 'Delivering':
                return 'purple';
            case 'Completed':
                return 'green';
            default:
                return 'black';
        }
    };

    const handlePaymentSearch = () => {
        const filteredPaymentItem = paidorder.filter((order) => 
            order.city.toLowerCase().includes(paymentSearch.toLowerCase())
        );
        setPaidOrder(filteredPaymentItem);
    }

    const handleCodSearch = () => {
        const filteredCod = codorder.filter((ord) => 
            ord.city.toLowerCase().includes(codSearch.toLowerCase())
        );
        setCodSearch(filteredCod);
    }
    




    return (
        <div style={{ display: 'flex', height: '00vh', maxWidth: '161vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#ecf0f1', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#1c2331', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Order Payment Management
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Paid Orders
                    </Typography>
                    <TextField
                    label = "Search"
                    variant="outlined"
                    size="small"
                    style={{marginBottom: 10}}
                    value={paymentSearch}
                    onChange={(e) => setPaymentSearch(e.target.value)}></TextField>

                <Button variant="contained" sx ={{bgcolor:'#B7EBBD', color:'#000000'}} onClick={handlePaymentSearch}>
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
                                    <DataGrid rows={paidorder} columns={columns} pageSize={5} />
                                </div>
                    
                            </div>
                </div>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Cash On Delivery Orders
                    </Typography>

                    <TextField
                    label = "Search"
                    variant="outlined"
                    size="small"
                    style={{marginBottom: 10}}
                    value={codSearch}
                    onChange={(e) => setCodSearch(e.target.value)}></TextField>

                <Button variant="contained" sx ={{bgcolor:'#B7EBBD', color:'#000000'}} onClick={handleCodSearch}>
                    Search
                </Button>

                    
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={codorder} columns={column} pageSize={5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPaymentManage;
