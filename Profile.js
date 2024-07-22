import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Divider,
    Paper,
    Button,
    Avatar,
    Modal,
    TextField,
} from '@material-ui/core';
import Navbar from '../Main/NavBar.js';
import Footer from '../Main/Footer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundImage:`url(${'https://i.pinimg.com/originals/ee/29/70/ee29703780f7172631b1bab06e70c66f.jpg'})`,
    },
    header: {
        textAlign: 'center',
        margin: theme.spacing(2, 0),
    },
    paper: {
        padding: theme.spacing(3),
        margin: 'auto',
        maxWidth: 400,
    },
    infoItem: {
        marginBottom: theme.spacing(2),
    },
    bold: {
        fontWeight: 'bold',
    },
    button: {
        marginTop: theme.spacing(2),
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
        marginLeft: '150px',
        width: theme.spacing(10),
        height: theme.spacing(10),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

function Profile() {
    const classes = useStyles();
    const email = sessionStorage.getItem("cusmail");
    const [profile, setProfile] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const profileDetails = profile[0] || {};
    const [edtname, setEdtname] = useState(profileDetails.name);
    const [edtphone, setEdtphone] = useState(profileDetails.phone);    

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(global.APIUrl+`/user/profile/${email}`);
            setProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            const res = await axios.delete(global.APIUrl+`/user/delete/${email}`);
            sessionStorage.setItem('cusmail', 'empty');
            window.location.href = "/";
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    }

    const handleLoyalProfile = async () => {
        try {
            profileDetails.isLoyal = true;
            const editData = {
                name: profileDetails.name,
                email: profileDetails.email,
                password: profileDetails.password,
                phone: profileDetails.phone,
                isLoyal: profileDetails.isLoyal,
                points: profileDetails.points,
                userType: profileDetails.userType
            };

            console.log(editData);

            const res = await axios.put(global.APIUrl+`/user/update`, editData);

            Swal.fire({
                title: "Success!",
                text: "Loyalty Activated",
                icon: 'success',
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/Profile";
                }
            });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleEditProfile = () => {
        setEditModalOpen(true);
    };

    const handleModalClose = () => {
        setEditModalOpen(false);
    };

    const handleSaveChanges = async () => {
        try {

            if (edtphone.length > 10) {
                Swal.fire({
                    title: "Error!",
                    text: "Phone number should not exceed 10 digits.",
                    icon: 'error',
                    confirmButtonText: "OK"
                });
                return; // Prevent further execution
            }
            var data = {
                name: edtname,                
                phone: edtphone,
                email:profileDetails.email,               
                password: profileDetails.password,                
                isLoyal: profileDetails.isLoyal,
                points: profileDetails.points,
                userType: profileDetails.userType
            };
            console.log(data);
            const res = await axios.put(global.APIUrl+`/user/update`, data);
            Swal.fire({
                title: "Success!",
                text: "Profile Updated Successfully",
                icon: 'success',
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.header}>
                <Typography variant="h3" component="h1">Profile</Typography>
            </div>
            <hr style={{ width: 100, }}></hr>
            <br />
            <br />
            <Grid container justify="center">
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <div className={classes.infoItem}>
                            <Avatar className={classes.icon}>
                                <AccountCircleIcon />
                            </Avatar>
                            <br />
                            <Typography variant="h6" className={classes.bold}>
                                Name:
                            </Typography>
                            <Typography variant="body1">
                                {profileDetails.name}
                            </Typography>
                        </div>
                        <div className={classes.infoItem}>
                            <Typography variant="h6" className={classes.bold}>
                                Email:
                            </Typography>
                            <Typography variant="body1">
                                {profileDetails.email}
                            </Typography>
                        </div>
                        <div className={classes.infoItem}>
                            <Typography variant="h6" className={classes.bold}>
                                Phone:
                            </Typography>
                            <Typography variant="body1">
                                {profileDetails.phone}
                            </Typography>
                        </div>
                        <div className={classes.infoItem}>
                            <Typography variant="h6" className={classes.bold}>
                                Loyalty Status:
                            </Typography>
                            <Typography variant="body1">
                                {profileDetails.isLoyal === 'true' ? 'Loyal Customer' : 'Not Loyal Customer'}
                            </Typography>
                        </div>
                        {profileDetails.isLoyal === 'true' && (
                            <div className={classes.infoItem}>
                                <Typography variant="h6" className={classes.bold}>
                                    Points:
                                </Typography>
                                <Typography variant="body1">
                                    {profileDetails.points}
                                </Typography>
                            </div>
                        )}
                        {profileDetails.isLoyal !== 'true' && (
                            <>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    onClick={handleLoyalProfile}
                                    style={{ backgroundColor: '#009688', color: '#fff' }}
                                >
                                    Activate Loyalty
                                </Button>
                                &nbsp;
                                &nbsp;
                            </>
                        )}
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={handleDeleteProfile}
                        >
                            Delete Profile
                        </Button>
                        &nbsp;
                        &nbsp;
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleEditProfile}
                        >
                            Edit Profile
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Modal
                open={editModalOpen}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.modalPaper}>
                    <Typography variant="h6" id="modal-title">
                        Edit Profile
                    </Typography>
                    <form>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            value={edtname}
                            onChange={(e) => setEdtname(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />                       
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={edtphone}
                            onChange={(e) => setEdtphone(e.target.value)}
                            fullWidth
                            margin="normal"
                            type='number'
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveChanges}
                        >
                            Save Changes
                        </Button>
                    </form>
                </div>
            </Modal>
            <br />
            <br />
            <Footer />
        </div>
    );
}

export default Profile;
