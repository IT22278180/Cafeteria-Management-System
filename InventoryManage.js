import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';

const InventoryManage = () => {
    const [inventory, setInventory] = useState([]);
    const [inventorySearch, setInventorySearch] = useState('');
    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle:"Inventory item report",
        onAfterPrint:()=>alert("Inventory items report successfully download!")
    })

    useEffect(() => {
        fetchInventoryDetails();
        const editBtn = false;     
        const data = {            
            editBtn
        };
        localStorage.setItem('selectedInventory', JSON.stringify(data));
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

    const handleAddInventory = () => {
        window.location.href = "/InventoryForm";
    };

    const handleEditInventory = (selectedInventory) => {   
        const editBtn = true;     
        const data = {
            selectedInventory,
            editBtn
        };
        localStorage.setItem('selectedInventory', JSON.stringify(data));
        window.location.href = "/InventoryForm";
    };

    const handleDeleteInventory = (itemId) => {
        axios.delete(global.APIUrl + "/inventoryItem/delete/" + itemId).then(() => {
            window.location.href = "/InventoryManage";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Inventory Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    };

    const columns = [
        { field: 'itemId', headerName: 'Item ID', width: 220 },
        { field: 'itemName', headerName: 'Item Name', width: 220 },
        { field: 'stock', headerName: 'Stock', width: 250 },
        { field: 'exp', headerName: 'Expire Date', width: 185 },
        { field: 'mnf', headerName: 'Manufacture Date', width: 185 },      
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>                   
                    <IconButton color="primary" onClick={() => handleEditInventory(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteInventory(params.row.itemId)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const handleInventorySearch = () => {
        const filteredInventoryItem = inventory.filter((inv) =>
            inv.itemName.toLowerCase().includes(inventorySearch.toLowerCase())
        );
        setInventory(filteredInventoryItem);
    };

    // Check if stock count is less than 25
    const lowStockItems = inventory.filter(item => item.stock < 25);

    return (
        <div style={{ display: 'flex', height: '100vh', maxWidth: '161vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#B7EBBD', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#EDAF28', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                        Inventory Management
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button variant="contained" sx={{bgcolor:'#009637', color:'#ffffff'}} color="primary" onClick={handleAddInventory}>
                            Add New Item
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                    Inventory Details
                    </Typography>
                    {lowStockItems.length > 0 && (
                        <div style={{ marginBottom: 20 }}>
                            <Typography variant="body1" color="error">
                                The following items have low stock count (less than 25):
                            </Typography>
                            <ul>
                                {lowStockItems.map(item => (
                                    <li key={item.id}>{item.itemName} - Stock: {item.stock}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        style={{ marginBottom: 10 }}
                        value={inventorySearch}
                        onChange={(e) => setInventorySearch(e.target.value)}
                    />
                    <Button variant="contained" sx ={{bgcolor:'#B7EBBD', color:'#000000'}} onClick={handleInventorySearch}>
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

                        <div ref={ComponentsRef} style={{ width: '100%' }}>     

                    <div style={{ width: '100%' }}>
                        <DataGrid rows={inventory} columns={columns} pageSize={5} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryManage;
