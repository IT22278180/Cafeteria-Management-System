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
        backgroundColor:'#B7EBBD',
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
        paddingBottom: '30px',
    },
}));

function Support() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState(sessionStorage.getItem("cusmail"));
    const [phone, setPhone] = useState('');
    const [issueDetail, setIssueDetail] = useState('');
    const uniqueId = "T" + generateId();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(today.getDate()).padStart(2, '0');
    const todayDate = `${year}-${month}-${day}`;
    const status = 'Pending';
    const [tickets, setTickets] = useState([]);
    const [editvalue, setEditvalue] = useState(false);

    useEffect(() => {
        fetchTicketDetails();
    }, []);

    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    const fetchTicketDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/support/allSupport');
            const ticketsWithId = response.data.map((ticket, index) => ({
                id: index + 1,
                ...ticket
            }));
            setTickets(ticketsWithId);
        } catch (error) {
            console.error('Error fetching ticket details:', error);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleIssueDetailChange = (event) => {
        setIssueDetail(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const supportData = { name, email, phone, issueDetail, uniqueId, status, todayDate };
        try {
            await axios.post(global.APIUrl + "/support/addSupport", supportData);
            Swal.fire({
                title: "Success!",
                text: "Support ticket raised successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed to raise support ticket.",
                icon: 'error',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/Support";
            }, 3000);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(global.APIUrl + `/support/deleteSupport/${id}`);
            Swal.fire({
                title: "Success!",
                text: "Support ticket deleted successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            fetchTicketDetails();
        } catch (error) {
            console.error('Error deleting ticket:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete support ticket.",
                icon: 'error',
                confirmButtonText: "OK"
            });
        }
    };

    const handleEdit = (uniqueId, name, email, phone, issueDetail, status, todayDate) => {
        setName(name);
        setEmail(email);
        setPhone(phone);
        setIssueDetail(issueDetail);
        localStorage.setItem("uniqueId", uniqueId);
        localStorage.setItem("status", status);
        localStorage.setItem("todayDate", todayDate);
        setEditvalue(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const uniqueId = localStorage.getItem("uniqueId");
        const status = localStorage.getItem("status");
        const todayDate = localStorage.getItem("todayDate");
        const supportData = { name, email, phone, issueDetail, uniqueId, status, todayDate };
        try {
            await axios.put(global.APIUrl + `/support/updateSupport/${uniqueId}`, supportData);
            Swal.fire({
                title: "Success!",
                text: "Support ticket updated successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            fetchTicketDetails();
            setEditvalue(false);
            setTimeout(() => {
                window.location.href = "/Support";
            }, 1000);
        } catch (error) {
            console.error('Error updating ticket:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update support ticket.",
                icon: 'error',
                confirmButtonText: "OK"
            });
           setTimeout(() => {
                window.location.href = "/Support";
            }, 1000);
        }
    };


    const getStatusColor = (status) => {
        switch (status) {
            case 'Rejected':
                return 'red';
            case 'Completed':
                return 'green';
            case 'Pending':
                return 'orange';
            default:
                return 'black';
        }
    };

    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.header}>                
                {editvalue ? (
                   <Typography variant="h3" component="h1">Edit Support Ticket</Typography>
                ) : (
                    <Typography variant="h3" component="h1">Support Ticket</Typography>
                )}
            </div>
            <hr style={{ width: 100 }}></hr>
            <section className={classes.section}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3} direction="column">
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                value={email}
                                onChange={handleEmailChange}
                                type='email'
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="issueDetail"
                                label="Issue Detail"
                                multiline
                                rows={4}
                                value={issueDetail}
                                onChange={handleIssueDetailChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {editvalue ? (
                                <Button variant="contained" color="primary" onClick={handleEditSubmit}>
                                    Edit Ticket
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" type="submit">
                                    Save Ticket
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </section>
            <section className={classes.table}>
                <TableContainer component={Paper}>
                    <Table aria-label="ticket table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Issue Detail</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket) => (
                                (ticket.email === email)&&( <TableRow key={ticket.id}>
                                    <TableCell>{ticket.uniqueId}</TableCell>
                                    <TableCell>{ticket.name}</TableCell>
                                    <TableCell>{ticket.email}</TableCell>
                                    <TableCell>{ticket.phone}</TableCell>
                                    <TableCell>{ticket.issueDetail}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            style={{ color: getStatusColor(ticket.status), borderColor: getStatusColor(ticket.status) }}
                                            disabled
                                        >
                                            {ticket.status}
                                        </Button>
                                    </TableCell>
                                    {ticket.status === 'Pending' ? (
                                            <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleDelete(ticket.uniqueId)}>
                                                Delete
                                            </Button>{' '}
                                            <Button variant="contained" color="primary" onClick={() => handleEdit(ticket.uniqueId, ticket.name, ticket.email, ticket.phone, ticket.issueDetail, ticket.status, ticket.todayDate)}>
                                                Edit
                                            </Button>
                                        </TableCell>
                                        ) : (
                                            <TableCell>
                                        <Button
                                            variant="outlined"
                                            style={{ color: getStatusColor(ticket.status), borderColor: getStatusColor(ticket.status) }}
                                            disabled
                                        >
                                            {'Cant Edited on After Process'}
                                        </Button>
                                    </TableCell>
                                        )}
                                    
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

export default Support;
