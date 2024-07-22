import React, { useState, useRef,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField } from '@material-ui/core';
import { useReactToPrint} from 'react-to-print';

const PromotionManage = () => {
    const [promotion, setPromotion] = useState([]);
    const [promotionSearch, setPromotionSearch] = useState('');
    const ComponentsRef = useRef(); 
  const handlePrint = useReactToPrint({ 
    content: () => ComponentsRef.current, 
    DocumentTitle:"Promotion Details", 
    onafterprint:()=>alert("Promotion Report Successfully Download!") 
  })

    useEffect(() => {
        fetchPromotionDetails();
        const editBtn = false;     
        const data = {            
            editBtn
        };
        localStorage.setItem('selectedPromotion', JSON.stringify(data));
    }, []);

    const fetchPromotionDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/promotion/all');
            const promotionsWithId = response.data.map((promotion, index) => ({
                id: index + 5,
                ...promotion
            }));
            setPromotion(promotionsWithId);
        } catch (error) {
            console.error('Error fetching promotion details:', error);
        }
    };

    const handleAddPromotion = () => {
        window.location.href = "/PromotionForm";
    };

    const handleEditPromotion = (selectedPromotion) => {
        const editBtn = true;     
        const data = {
            selectedPromotion,
            editBtn
        };
        localStorage.setItem('selectedPromotion', JSON.stringify(data));
        window.location.href = "/PromotionForm";
    };


    const handleDeletePromotion = (promotionId) => {
        axios.delete(global.APIUrl + "/promotion/delete/" + promotionId).then(() => {
            window.location.href = "/PromotionManage";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Promotion Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })

    };

    const handleUpdatePromotion = async (selectedPromotion) => {
        try {
            let updatedStatus;
            if (selectedPromotion.status === 'Activate') {
                updatedStatus = 'Deactivate';
            } else {
                updatedStatus = 'Activate';
            }

            const data = {
                promotionId: selectedPromotion.promotionId,
                name: selectedPromotion.name,
                promo: selectedPromotion.promo,
                status: updatedStatus,
                date: selectedPromotion.date,
                con: selectedPromotion.con
            };
            await axios.put(`${global.APIUrl}/promotion/update/${selectedPromotion.promotionId}`, data);            
            window.location.href = "/PromotionManage";
        } catch (error) {
            console.error('Error updating promotion:', error);
        }
    }

    const columns = [
        { field: 'promotionId', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Promotion Name', width: 210 },
        { field: 'promo', headerName: 'Promotion', width: 200 },
        { field: 'con', headerName: 'Req Minimum Amount', width: 200 },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    style={{ color: getStatusColor(params.value), borderColor: getStatusColor(params.value) }}
                    disabled
                >
                    {params.value}
                </Button>
            ),
        },
        { field: 'date', headerName: 'Date', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                     {params.row.status === 'Activate' ? (
                        <IconButton color="error" onClick={() => handleUpdatePromotion(params.row)}>
                            <CloseIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="success" onClick={() => handleUpdatePromotion(params.row)}>
                            <CheckIcon />
                        </IconButton>
                    )}                   
                    <IconButton color="primary" onClick={() => handleEditPromotion(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeletePromotion(params.row.promotionId)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Deactivate':
                return 'red';
            case 'Activate':
                return 'green';
            default:
                return 'black';
        }
    };

    const handlePromotionSearch = () => {
        const filteredPromotion = promotion.filter((promo) =>
            promo.name.toLowerCase().includes(promotionSearch.toLocaleLowerCase())
    );
    setPromotion(filteredPromotion);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', maxWidth: '161vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#B7EBBD', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#EDAF28', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                        Promotion Management
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button variant="contained" sx={{bgcolor:'#009637',color:'#ffffff'}} onClick={handleAddPromotion}>
                            Add New Promotion
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                    Promotion Details
                    </Typography>
                    <TextField
                        label="search"
                        variant="outlined"
                        size="small"
                        style={{marginBottom:10}}
                        value={promotionSearch}
                        onChange={(e) => setPromotionSearch(e.target.value)} />

                        <Button variant="contained" sx={{bgcolor: '#B7EBBD', color:'#000000'}} onClick={handlePromotionSearch}>Search</Button>
                    <div style={{ width: '100%' }}>
                    <button onClick={handlePrint}
                             style={{
                                backgroundColor: '#37a2d7',
                                color: '#ffffff',
                                padding: '10px', 
                                variant : "contained",
                                border: 'none', 
                                borderRadius: '5px', 
                                
                            }}>
                            
                            <i className="fas fa-download" style={{ marginRight: '8px'}}></i> 
                            Download
                            </button>
                        <div ref={ComponentsRef} style={{ width: '100%' }}>
                        <DataGrid rows={promotion} columns={columns} pageSize={5} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionManage;
