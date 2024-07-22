import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography, AppBar, Toolbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const MenuForm = () => {

    const [newItem, setNewItem] = useState({
        itemId: "IM" + generateId(),
        itemName: '',
        description: '',
        calorieCount: '',
        price: '',
        categoryType: '',
        quantity: '',
        picture: "",
        inventoryItem: "",
        status: "Deactivate"
    });
    const [item, setItem] = useState({
        id: 0,
        _id: "",
        itemId: "",
        itemName: "",
        stock: "",
        exp: "",
        mnf: "",
        createdAt: "",
        updatedAt: "",
        __v: 0 //version number
    })

    const info = JSON.parse(localStorage.getItem("selectedMenu"));

    useEffect(() => {
        if (info.editBtn) {
            setNewItem(info.selectedMenu);
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
    const [imageSelected, setImageSelected] = useState(null);
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetchInventoryDetails();
    }, []);

    const fetchInventoryDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/inventoryItem/allItem');
            const inventorysWithId = response.data.map((inventory, index) => ({
                id: index + 1,
                ...inventory
            }));
            setInventory(inventorysWithId);
        } catch (error) {
            console.error('Error fetching inventory details:', error);
        }
    };

    const handleImageChange = (event) => {
        setImageSelected(event.target.files[0]);
        setNewItem({ ...newItem, picture: "https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + event.target.files[0].name });
    };

    const handleAddItem = async () => {
        if (validateForm()) {
            const formData = new FormData();
            formData.append("file", imageSelected);
            formData.append("upload_preset", "ml_default");
            item.stock = item.stock - newItem.quantity;
            try {
                await axios.post(
                    "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
                    formData
                ).then(await axios.post(global.APIUrl + "/menuItem/addMenuItem", newItem)).then(await axios.put(global.APIUrl + "/inventoryItem/update", item));
                Swal.fire({
                    title: "Success!",
                    text: "Menu item added successfully.",
                    icon: 'success',
                    confirmButtonText: "OK"
                });
                setTimeout(() => {
                    window.location.href = "/MenuManage";
                }, 3000);
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add menu item.",
                    icon: 'error',
                    confirmButtonText: "OK"
                });
                setTimeout(() => {
                    window.location.href = "/MenuForm";
                }, 3000);
            }
        }
    };

    const handleEditItem = async () => {
        if (validateForm()) {
            newItem.itemId = info.selectedMenu.itemId;
            try {
                await axios.put(global.APIUrl + "/menuItem/update", newItem);
                Swal.fire({
                    title: "Success!",
                    text: "Menu item updated successfully.",
                    icon: 'success',
                    confirmButtonText: "OK"
                });
                localStorage.setItem('selectedMenu', JSON.stringify({}));
                setTimeout(() => {
                    window.location.href = "/MenuManage";
                }, 1000);
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update Menu item.",
                    icon: 'error',
                    confirmButtonText: "OK"
                });
                localStorage.setItem('selectedMenu', JSON.stringify({}));
                setTimeout(() => {
                    window.location.href = "/MenuManage";
                }, 1000);
            }
        }
    }

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

        if (!newItem.inventoryItem.trim()) {
            errors.inventoryItem = 'Inventory Item is required';
            isValid = false;
        }

        if (!newItem.description.trim()) {
            errors.description = 'Description is required';
            isValid = false;
        }

        if (!newItem.calorieCount.toString().trim() || newItem.calorieCount <= 0 ){
            errors.calorieCount = 'Calorie Count is required and must be a positive number';
            isValid = false;
        }

        if (!newItem.price.toString().trim() || newItem.price <= 0) {
            errors.price = 'Price is required and must be a positive number';
            isValid = false;
        }

        if (!newItem.categoryType.trim()) {
            errors.categoryType = 'Category Type is required';
            isValid = false;
        }
        if (!newItem.quantity.toString().trim()) {
            errors.quantity = 'Quantity is required';
            isValid = false;
        } else if (newItem.quantity > item.stock && !info.editBtn) {
            errors.quantity = 'Quantity is more than stock. Stock available: ' + item.stock;
            isValid = false;
        }
        if (!imageSelected && !info.editBtn) {
            errors.picture = 'Image is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        localStorage.setItem('selectedMenu', JSON.stringify({}));
        window.location.href = "/MenuManage";
    };

    return (
        <div style={{ paddingTop: '64px', backgroundColor: '#B7EBBD' }}>
            <AppBar position="fixed" style={{ backgroundColor: '#EDAF28', boxShadow: 'none' }}>
                <Toolbar>
                    {(info.editBtn) ? (
                        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Edit Menu Item
                        </Typography>
                    ) : (
                        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Add Menu Item
                        </Typography>
                    )}
                    <div style={{ flexGrow: 1 }}></div>
                    {(info.editBtn) ? (
                        <Button variant="contained" sx={{ bgcolor: '#009637', color: '#ffffff' }} onClick={handleEditItem}>
                            Edit Item
                        </Button>
                    ) : (
                        <Button variant="contained" sx={{ bgcolor: '#009637', color: '#ffffff' }} onClick={handleAddItem}>
                            Add Item
                        </Button>
                    )}
                    <Button variant="contained" color="error" onClick={handleCancel} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{ marginTop: '20px', paddingBottom: '20px' }}>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {(info.editBtn) ? (
                                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                    Edit Menu Item Form
                                </Typography>
                            ) : (
                                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                    Add Menu Item Form
                                </Typography>
                            )}
                            <hr />
                        </Grid>
                        <Grid item xs={5}>
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
                        <Grid item xs={5}>
                            <FormControl fullWidth error={!!errors.inventoryItem}>
                                <InputLabel>Inventory Item</InputLabel>
                                <Select
                                    value={newItem.inventoryItem}
                                    onChange={(e) => {
                                        const selectedItem = inventory.find(item => item.itemId === e.target.value);
                                        setNewItem({ ...newItem, inventoryItem: e.target.value });
                                        setItem(selectedItem);
                                    }}
                                    disabled={info.editBtn}
                                >
                                    {inventory.map(item => (
                                        <MenuItem key={item._id} value={item.itemId}>{item.itemName}</MenuItem>
                                    ))}
                                </Select>
                                {errors.inventoryItem && <Typography variant="caption" color="error">{errors.inventoryItem}</Typography>}
                            </FormControl>
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
                                label="Description"
                                fullWidth
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Calorie Count"
                                fullWidth
                                value={newItem.calorieCount}
                                onChange={(e) => setNewItem({ ...newItem, calorieCount: e.target.value })}
                                error={!!errors.calorieCount}
                                helperText={errors.calorieCount}
                                type='number'
                                inputProps={{ min: 0 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                fullWidth
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                error={!!errors.price}
                                helperText={errors.price}
                                type='number'
                                inputProps={{ min: 0 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!errors.categoryType}>
                                <InputLabel>Category Type</InputLabel>
                                <Select
                                    value={newItem.categoryType}
                                    onChange={(e) => setNewItem({ ...newItem, categoryType: e.target.value })}
                                >
                                    <MenuItem value="Bread & Buns">Bread & Buns</MenuItem>
                                    <MenuItem value="Fried Savouries">Fried Savouries</MenuItem>
                                    <MenuItem value="Cookie & Snack">Cookie & Snack</MenuItem>
                                    <MenuItem value="Beverages">Beverages</MenuItem>
                                    <MenuItem value="Desserts">Desserts</MenuItem>
                                </Select>
                                {errors.categoryType && <Typography variant="caption" color="error">{errors.categoryType}</Typography>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={info.editBtn}
                            />
                            {errors.picture && <Typography variant="caption" color="error">{errors.picture}</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Quantity"
                                fullWidth
                                value={newItem.quantity}
                                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                error={!!errors.quantity}
                                helperText={errors.quantity}
                                type='number'
                                inputProps={{ min: 0 }}
                                disabled={info.editBtn}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default MenuForm;
