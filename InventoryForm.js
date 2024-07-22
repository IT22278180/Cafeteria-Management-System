import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, Typography, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const InventoryForm = () => {
    const [newItem, setNewItem] = useState({
        itemId: "IN" + generateId(),
        itemName: '',
        stock: 1,
        exp: '',
        mnf: ''
    });

    const info = JSON.parse(localStorage.getItem("selectedInventory"));

    useEffect(() => {
        if (info.editBtn) {
            setNewItem(info.selectedInventory);
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
                await axios.post(global.APIUrl + "/inventoryItem/addItem", newItem)
                Swal.fire({
                    title: "Success!",
                    text: "Inventory item added successfully.",
                    icon: 'success',
                    confirmButtonText: "OK"
                });
                setTimeout(() => {
                    window.location.href = "/InventoryManage";
                }, 3000);
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add inventory item.",
                    icon: 'error',
                    confirmButtonText: "OK"
                });
                setTimeout(() => {
                    window.location.href = "/InventoryForm";
                }, 3000);
            }
        }
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newItem.itemId.trim()) {
            errors.itemId = 'Item ID is required';
            isValid = false;
        }

        if (!newItem.itemName.trim()) {
            errors.itemName = 'Item Name is required';
            isValid = false;
        }

        if (!newItem.stock.toString().trim()) {
            errors.stock = 'Stock is required';
            isValid = false;
        }
        
    // Validate Stock
    if (newItem.stock <= 0) {
        errors.stock = 'Stock must be a positive value';
        isValid = false;
    }
        
    // Validate Expire Date
    const today = new Date();
    const expireDate = new Date(newItem.exp);
    if (!newItem.exp.trim()) {
        errors.exp = 'Expire Date Count is required';
        isValid = false
    } else if (expireDate < today) {
        errors.exp = 'Expire Date cannot be in the past';
        isValid = false;
    }

     // Validate Manufacture Date
     const manufactureDate = new Date(newItem.mnf);
     if (!newItem.mnf.trim()) {
         errors.mnf = 'Manufacture Date is required';
         isValid = false;
     } else if (manufactureDate > today) {
         errors.mnf = 'Manufacture Date cannot be in the future';
         isValid = false;
     }

        if (!newItem.mnf.trim()) {
            errors.mnf = 'Manufacture Date is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        localStorage.setItem('selectedInventory', JSON.stringify({}));
        window.location.href = "/InventoryManage";
    };

    const handleEditItem = async () => {
        if (validateForm()) {
            newItem.itemId = info.selectedInventory.itemId;            
            try {
                await axios.put(global.APIUrl + "/inventoryItem/update", newItem);
                Swal.fire({
                    title: "Success!",
                    text: "Inventory item updated successfully.",
                    icon: 'success',
                    confirmButtonText: "OK"
                });
                localStorage.setItem('selectedInventory', JSON.stringify({}));
                setTimeout(() => {
                    window.location.href = "/InventoryManage";
                }, 1000);
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update inventory item.",
                    icon: 'error',
                    confirmButtonText: "OK"
                });
                localStorage.setItem('selectedInventory', JSON.stringify({}));
                setTimeout(() => {
                    window.location.href = "/InventoryManage";
                }, 1000);
            }
        }
    }

    return (
        <div style={{ height: '100vh', paddingTop: '64px', backgroundColor: '#B7EBBD' }}>
            <AppBar position="fixed" style={{ backgroundColor: '#EDAF28', boxShadow: 'none' }}>
                <Toolbar>
                    {(info.editBtn) ? (
                        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Edit Inventory Item
                        </Typography>
                    ) : (
                        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Add Inventory Item
                        </Typography>
                    )}
                    <div style={{ flexGrow: 1 }}></div>
                    {(info.editBtn) ? (
                        <Button variant="contained" sx={{bgcolor:'#009637', color:'#ffffff'}} color="primary" onClick={handleEditItem}>
                            Edit Item
                        </Button>
                    ) : (
                        <Button variant="contained" sx={{bgcolor:'#009637', color:'#ffffff'}} color="primary" onClick={handleAddItem}>
                            Add Item
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
                                    Edit Inventory Item Form
                                </Typography>
                            ) : (
                                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                    Add Inventory Item Form
                                </Typography>
                            )}
                            <hr />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Item ID"
                                fullWidth
                                placeholder='A4562'
                                value={newItem.itemId}
                                onChange={(e) => setNewItem({ ...newItem, itemId: e.target.value })}
                                error={!!errors.itemId}
                                helperText={errors.itemId}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Item Name"
                                fullWidth
                                value={newItem.itemName}
                                onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                                error={!!errors.itemName}
                                helperText={errors.itemName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Stock"
                                fullWidth
                                value={newItem.stock}
                                onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                                error={!!errors.stock}
                                helperText={errors.stock}
                                type='number'
                                inputProps={{ min: 0 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Expire Date"
                                fullWidth
                                value={newItem.exp}
                                onChange={(e) => setNewItem({ ...newItem, exp: e.target.value })}
                                error={!!errors.exp}
                                helperText={errors.exp}
                                type='date'
                                focused
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Manufacture Date"
                                fullWidth
                                value={newItem.mnf}
                                onChange={(e) => setNewItem({ ...newItem, mnf: e.target.value })}
                                error={!!errors.mnf}
                                helperText={errors.mnf}
                                type='date'
                                focused
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default InventoryForm;
