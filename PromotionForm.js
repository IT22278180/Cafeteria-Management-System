import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const PromotionForm = () => {
    const [promotion, setPromotion] = useState({
        promotionId: "P" + generateId(),
        name: '',
        promo:'' ,
        status: 'Deactive',
        date: '',
        con: ''
    });

    const info = JSON.parse(localStorage.getItem("selectedPromotion"));

    useEffect(() => {
        if (info.editBtn) {
            setPromotion(info.selectedPromotion);
        }
    }, []);

    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    const [errors, setErrors] = useState({});

    const handleAddItem = async () => {
        if (validateForm()) {
            try {
                await axios.post(global.APIUrl + "/promotion/addPromotion", promotion)
                Swal.fire({
                    title: "Success!",
                    text: "Promotion added successfully.",
                    icon: 'success',
                    confirmButtonText: "OK"
                });
                setTimeout(() => {
                    window.location.href = "/PromotionManage";
                }, 3000);
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add Promotion.",
                    icon: 'error',
                    confirmButtonText: "OK"
                });
                setTimeout(() => {
                    window.location.href = "/PromotionForm";
                }, 3000);
            }
        }
    };

    const handleEditItem = async () => {
        if (validateForm()) {
            promotion.promotionId = info.selectedPromotion.promotionId;
            try {
                await axios.put(`${global.APIUrl}/promotion/update/${promotion.promotionId}`, promotion);
                Swal.fire({
                    title: "Success!",
                    text: "Promotion updated successfully.",
                    icon: 'success',
                    confirmButtonText: "OK"
                }).then(() => {
                    localStorage.setItem('selectedPromotion', JSON.stringify({}));
                    setTimeout(() => {
                        window.location.href = "/PromotionManage";
                    }, 1000);
                });
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update Promotion.",
                    icon: 'error',
                    confirmButtonText: "OK"
                }).then(() => {
                    localStorage.setItem('selectedPromotion', JSON.stringify({}));
                    setTimeout(() => {
                        window.location.href = "/PromotionManage";
                    }, 1000);
                });
            }
        }
    };
    

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!promotion.name.trim()) {
            errors.name = 'Promotion Name is required';
            isValid = false;
        }

        if (promotion.promo <= 0) {
            errors.promo = 'Promotion must be greater than o';
            isValid = false;
        }
        if (!promotion.date.trim()) {
            errors.date = 'Promotion Date is required';
            isValid = false;
        }else {
            const currentDate = new Date();
            const selectedDate = new Date(promotion.date);
            if (selectedDate <= currentDate) { // Check if selected date is in the past
                errors.date = 'Promotion Date must be in the future';
                isValid = false;
            }
        }
        

        if (promotion.con <= 0) {
            errors.con = 'Promotion must be greater than o';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        localStorage.setItem('selectedPromotion', JSON.stringify({}));
        window.location.href = "/PromotionManage";
    };

    return (
        <div style={{ height: '100vh', paddingTop: '64px', backgroundColor: '#B7EBBD' }}>
            <AppBar position="fixed" style={{ backgroundColor: '#EDAF28', boxShadow: 'none' }}>
                <Toolbar>
                    {(info.editBtn) ? (
                        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Edit Promotion
                        </Typography>
                    ) : (
                        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Add Promotion
                        </Typography>
                    )}
                    <div style={{ flexGrow: 1 }}></div>
                    {(info.editBtn) ? (
                        <Button variant="contained" color="primary" onClick={handleEditItem}>
                            Edit
                        </Button>
                    ) : (
                        <Button variant="contained" sx={{bgcolor:'#009637',color:'#ffffff'}} onClick={handleAddItem}>
                            Add
                        </Button>
                    )}
                    <Button variant="contained" color="error" onClick={handleCancel} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {(info.editBtn) ? (
                                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                    Edit Promotion Form
                                </Typography>
                            ) : (
                                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                    Add Promotion Form
                                </Typography>
                            )}
                            <hr />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Promotion Name"
                                fullWidth
                                value={promotion.name}
                                onChange={(e) => setPromotion({ ...promotion, name: e.target.value })}
                                error={!!errors.name}
                                helperText={errors.name}
                                focused
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Discount Price (%)"
                                fullWidth
                                value={promotion.promo}
                                onChange={(e) => setPromotion({ ...promotion, promo: e.target.value })}
                                error={!!errors.promo}
                                helperText={errors.promo}
                                type='number'
                                inputProps={{ min: 0 }}
                                focused
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date"
                                fullWidth
                                value={promotion.date}
                                onChange={(e) => setPromotion({ ...promotion, date: e.target.value })}
                                error={!!errors.date}
                                helperText={errors.date}
                                type='date'
                                focused
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Required Minimum Amount"
                                fullWidth
                                value={promotion.con}
                                onChange={(e) => setPromotion({ ...promotion, con: e.target.value })}
                                error={!!errors.con}
                                helperText={errors.con}
                                type='number'
                               
                                focused
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default PromotionForm;
