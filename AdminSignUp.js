import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Card, CardContent, makeStyles, Link } from '@material-ui/core';
import axios from 'axios';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({

    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${'https://static.vecteezy.com/system/resources/previews/005/140/844/non_2x/brown-wooden-table-on-coffee-shop-or-restaurant-background-free-photo.jpg'})`, // Set background image URL
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },

    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    card: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));



const AdminSignUp = () => {
    const classes = useStyles();

    const generateRandomID = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };

    const [uid, setUId] = useState('A' + generateRandomID());
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nic, setNic] = useState('');
    const [status, setStatus] = useState('Activate');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [salary, setSalary] = useState(2000);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateName(name)) return;
        if (!validateEmail(email)) return;
        if (!validatePhone(phone)) return;
        if (!validatePassword()) return;
        if (!validateRePassword()) return;
        const type = "Admin";
        const admin = { uid, name, nic, status, email, phone, password, salary, type };
        try {
            const response = await axios.post(
                `${global.APIUrl}/admin/register`,
                admin
            );
            console.log(response);
            if (response.data.message !== "Email is Already Used") {

                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                    type: "success",
                }).then((okay) => {
                    if (okay) {
                        window.location.href = "/AdminLogin";
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: "Email Already Taken",
                    icon: "error",
                    confirmButtonText: "OK",
                    type: "success",
                });
                setTimeout(() => {
                    window.location.href = "/AdminSignUp";
                }, 3000);
            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: "Registration Not Success",
                icon: "error",
                confirmButtonText: "OK",
                type: "success",
            });
            setTimeout(() => {
                window.location.href = "/AdminSignUp";
            }, 3000);
        }

    };
    const validateName = (name) => {
        const regex = /^[a-zA-Z\s]+$/; // Only letters and spaces
        if (!name.trim()) {
          setNameError('Name is required');
          return false;
        }
        if (!regex.test(name)) {
          setNameError('Name should contain only letters and spaces');
          return false;
        }
        setNameError('');
        return true;
      };
    
      const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    
        validateName(value); // Validate the name on each change
      };

      const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email pattern
        if (!email.trim()) {
          setEmailError('Email is required');
          return false;
        }
        if (!regex.test(email)) {
          setEmailError('Invalid email address');
          return false;
        }
        setEmailError('');
        return true;
      };
    
      const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    
        validateEmail(value); // Validate the email on each change
      };

      const validatePhone = (phone) => {
        const regex = /^\d{10}$/; // Exactly 10 digits
        if (!phone.trim()) {
          setPhoneError('Phone number is required');
          return false;
        }
        if (!regex.test(phone)) {
          setPhoneError('Phone number must be exactly 10 digits');
          return false;
        }
        setPhoneError('');
        return true;
      };
    
      const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
    
        validatePhone(value); // Validate the phone number on each change
      };

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return false;
        }
        if (!/\d/.test(password)) {
            setPasswordError('Password must contain at least one digit');
            return false;
        }
        if (!/[a-zA-Z]/.test(password)) {
            setPasswordError('Password must contain at least one letter');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    
        validatePassword(value); // Validate the phone number on each change
      };

    const validateRePassword = () => {
        if (password !== rePassword) {
            setRePasswordError('Passwords do not match');
            return false;
        }
        setRePasswordError('');
        return true;
    };
    const handleRepasswordChange = (e) => {
        const value = e.target.value;
        setRePassword(value); // Correctly update the rePassword state
    
        // Validate passwords match after setting rePassword
        if (password !== value) {
            setRePasswordError('Passwords do not match');
        } else {
            setRePasswordError(''); // Clear the error if they match
        }
    };
    

    return (
        <div className={classes.root}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon style={{ fontSize: 40 }} />
                </Avatar>
                <br />
                <Typography component="h1" variant="h5">
                    Admin Sign Up
                </Typography>
                <br />
                <Card className={classes.card}>
                    <CardContent>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="id"
                                        label="ID"
                                        name="id"
                                        autoComplete="id"
                                        value={uid}
                                        onChange={(e) => setUId(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={handleNameChange}
                                        error={!!nameError}
                                        helperText={nameError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="nic"
                                        label="NIC"
                                        name="nic"
                                        autoComplete="nic"
                                        value={nic}
                                        onChange={(e) => setNic(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleEmailChange}
                                        error={!!emailError}
                                        helperText={emailError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        name="phone"
                                        autoComplete="phone"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        error={!!phoneError}
                                        helperText={phoneError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        error={!!passwordError}
                                        helperText={passwordError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="rePassword"
                                        label="Re-enter Password"
                                        type="password"
                                        id="rePassword"
                                        autoComplete="new-password"
                                        value={rePassword}
                                        onChange={ handleRepasswordChange}
                                        error={!!rePasswordError}
                                        helperText={rePasswordError}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Typography variant="body2" color="text.secondary" align="center" mt={5}>
                            {'Already have an account? '}
                            <Link href="AdminLogin" variant="body2">
                                Sign In
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </Container>
        </div>
    );
};

export default AdminSignUp;
