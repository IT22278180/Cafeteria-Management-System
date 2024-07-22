import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Button,
    Grid,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
import Navbar from '../Main/NavBar.js';
import Footer from '../Main/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: theme.palette.dark,
        color: theme.palette.primary,
        paddingTop: theme.spacing(4),
        textAlign: 'center',
    },
    section: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(10),
        marginLeft: theme.spacing(30),
        marginRight: theme.spacing(30),
    },
    form: {
        marginTop: theme.spacing(3),
    },
    table: {
        marginTop: theme.spacing(3),
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingBottom: '80px',
    },
}));

function Orders() {                                         
    const classes = useStyles();
    const email = sessionStorage.getItem("cusmail");
    const [paidorder, setPaidOrder] = useState([]);
    const [codorder, setCodOrder] = useState([]);

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
    
    async function handleDeletePaid(orderID) {                                          
        await axios.delete(global.APIUrl + "/payOrder/deletePaidOrder/" + orderID).then(() => {
            window.location.href = "/Orders";

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
            window.location.href = "/Orders";

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

    return(
    <div className={classes.root}>
    <Navbar />
    <div className={classes.header}>
        <Typography variant="h3" component="h1">Your Orders</Typography>
    </div>
    <hr style={{ width: 100 }}></hr>
    <Typography variant="h4" component="h2" style={{ textAlign: 'center', marginTop: '50px' }}>Paid Orders</Typography>
    <section className={classes.table}>
        <TableContainer component={Paper}>
            <Table aria-label="ticket table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Price (LKR)</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Issue Detail</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paidorder.map((order) => (
                        (order.email === email) && ( <TableRow key={order.id}>
                            <TableCell>{order.orderID}</TableCell>
                            <TableCell>{order.totalPrice}</TableCell>
                            <TableCell>{order.email}</TableCell>
                            <TableCell>{order.phoneNumber}</TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    style={{ color: getStatusColor(order.status), borderColor: getStatusColor(order.status) }}
                                    disabled
                                >
                                    {order.status}
                                </Button>
                            </TableCell>
                            {order.status === 'Processing' ? (
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeletePaid(order.orderID)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            ) : (<TableCell> <Button variant="contained" color="secondary" onClick={() => handleDeletePaid(order.orderID)} disabled>
                                Delete
                            </Button> </TableCell>)}
                        </TableRow>)                               
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </section>
    <Typography variant="h4" component="h2" style={{ textAlign: 'center' }}>Cash On Delivery Orders</Typography>
    <section className={classes.table}>
        <TableContainer component={Paper}>
            <Table aria-label="ticket table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Price (LKR)</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Issue Detail</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {codorder.map((order) => (
                         (order.email === email) && (<TableRow key={order.id}>
                            <TableCell>{order.orderID}</TableCell>
                            <TableCell>{order.totalPrice}</TableCell>
                            <TableCell>{order.email}</TableCell>
                            <TableCell>{order.phoneNumber}</TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    style={{ color: getStatusColor(order.status), borderColor: getStatusColor(order.status) }}
                                    disabled
                                >
                                    {order.status}
                                </Button>
                            </TableCell>
                            {order.status === 'Processing' ? (
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteCod(order.orderID)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            ) : (<TableCell> <Button variant="contained" color="secondary" onClick={() => handleDeleteCod(order.orderID)} disabled>
                                Delete
                            </Button> </TableCell>)}
                        </TableRow>)                                
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </section>
    <Footer />
</div>
);
}   

export default Orders;