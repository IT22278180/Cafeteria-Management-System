import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, Grid, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems'));
    const email = sessionStorage.getItem("cusmail");
    const [itemList, setItemList] = useState([]);
    const [profile, setProfile] = useState([]);
    const profileDetails = profile[0] || {};

    useEffect(() => {
        const itemsWithQuantities = checkoutItems.items.map(item => `${item.itemName} x ${item.quantity}`);
        setItemList(itemsWithQuantities);
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/user/profile/${email}`);
            setProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleLoyalProfile = async () => {
        try {
            if (profileDetails.isLoyal === 'true') {
                var newPoint = profileDetails.points + 5;
            }
            else {
                var newPoint = profileDetails.points;
            }
            const editData = {
                name: profileDetails.name,
                email: profileDetails.email,
                password: profileDetails.password,
                phone: profileDetails.phone,
                isLoyal: profileDetails.isLoyal,
                points: newPoint,
                userType: profileDetails.userType
            };
            const res = await axios.put(`http://localhost:5000/user/update`, editData);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!cardNumber.trim()) {
            errors.cardNumber = 'Card number is required';
        }
        if (!expirationDate.trim()) {
            errors.expirationDate = 'Expiration date is required';
        }else {
            const currentDate = new Date();
            const enteredDate = new Date(expirationDate);
            if (enteredDate <= currentDate) {
                errors.expirationDate = 'Expiration date must be in the future';
            }
        }
        if (!cvv.trim()) {
            errors.cvv = 'CVV is required';
        }
        if (!address.trim()) {
            errors.address = 'Address is required';
        }
        if (!city.trim()) {
            errors.city = 'City is required';
        }
        if (!postalCode.trim()) {
            errors.postalCode = 'Postal code is required';
        }
        if (!phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const orderDetails = {
                orderID: checkoutItems.orderID,
                totalPrice: checkoutItems.totalPrice,
                orderItems: itemList,
                status: 'Processing',
                address: address,
                city: city,
                postalCode: postalCode,
                phoneNumber: phoneNumber,
                email: email
            }
            try {
                const response = await axios.post(global.APIUrl + '/payOrder/addPaidOrder', orderDetails).then(handleLoyalProfile);
                const templateParams = {
                    to_email: email,
                    order_id: checkoutItems.orderID,
                    price: checkoutItems.totalPrice,
                    address: address,
                };

                emailjs.send(
                    'service_o9w0gm7',
                    'template_4c24jl3',
                    templateParams,
                    'jMT_4sdBCj0m5mlLD'
                )
                    .then((response) => {
                        console.log('Email sent:', response);
                    })
                    .catch((error) => {
                        console.error('Email sending failed:', error);
                    });
                localStorage.setItem('checkoutItems', JSON.stringify([]));
                localStorage.setItem('cartItems', JSON.stringify([]));

                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully!',
                    text: 'Your order has been placed successfully.',
                    confirmButtonText: 'OK'
                })
                setTimeout(() => {
                    window.location.href = "/MenuPage";
                }, 3000);
            } catch (error) {
                console.error('Error adding order:', error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an error placing your order. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            setErrors(validationErrors);
        }
    };


    const handleCancel = () => {
        localStorage.setItem('checkoutItems', JSON.stringify([]));
        localStorage.setItem('cartItems', JSON.stringify([]));
        window.location.href = '/MenuPage';
    };

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Payment Page
                    </Typography>
                    <Typography variant="h5" style={{ marginRight: '1rem', color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>
                        Caravan Fresh
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ padding: '50px' }}>
                <Box sx={{ border: '1px solid #ccc', borderRadius: '10px', p: '50px' }}>
                    <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                        Order ID : {checkoutItems.orderID}
                    </Typography>
                    <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                        Payment Price : LKR {checkoutItems.totalPrice}
                    </Typography>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Payment Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Card Number"
                                    variant="outlined"
                                    value={cardNumber}
                                    onChange={(e) => {
                                        const inputCardNumber = e.target.value.replace(/\D/g, '').slice(0, 16);
                                        setCardNumber(inputCardNumber);
                                    }}
                                    error={!!errors.cardNumber}
                                    helperText={errors.cardNumber}
                                    focused
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Expiration Date"
                                    variant="outlined"
                                    value={expirationDate}
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                    error={!!errors.expirationDate}
                                    helperText={errors.expirationDate}
                                    type='date'
                                    focused
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="CVV"
                                    variant="outlined"
                                    value={cvv}
                                    onChange={(e) => {
                                        const inputCVV = e.target.value.replace(/\D/g, '').slice(0, 3);
                                        setCvv(inputCVV);
                                    }}
                                    error={!!errors.cvv}
                                    helperText={errors.cvv}
                                    focused
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Delivery Address
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    variant="outlined"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Postal Code"
                                    variant="outlined"
                                    value={postalCode}
                                    onChange={(e) => {
                                        const inputPostalCode = e.target.value.replace(/\D/g, '').slice(0, 6);
                                        setPostalCode(inputPostalCode);
                                    }}
                                    error={!!errors.postalCode}
                                    helperText={errors.postalCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Phone Number
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    variant="outlined"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        const inputPhoneNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setPhoneNumber(inputPhoneNumber);
                                    }}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    inputProps={{ inputMode: 'numeric' }}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" sx={{bgcolor:'#009637',color:'#ffffff'}}>
                                    Pay Now
                                </Button>
                                <Button onClick={handleCancel} variant="contained" color="primary" style={{ backgroundColor: 'red', marginLeft: '20px', }}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default Payment;
