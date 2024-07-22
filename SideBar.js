import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import BadgeIcon from '@mui/icons-material/Badge';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ZperxLogo from '../Images/Zperx.png';

const SideBar = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const hradmin = sessionStorage.getItem("hradmin");


  useEffect(() => {
    const storedSelectedItem = window.sessionStorage.getItem('selectedItem');
    if (storedSelectedItem) {
      setSelectedItem(storedSelectedItem);
    }
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    window.sessionStorage.setItem('selectedItem', item);
    window.location.href = `/${item}`;
  };

  const handleLogout = () => {
    sessionStorage.setItem("hradmin", false);
    window.location.href = `/`;

  };

  return (
    <div>
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#009637',
            color: '#ffffff',
          },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
          <Avatar
            alt="Company Logo"
            src={ZperxLogo}
            sx={{ width: 80, height: 80, border: '2px solid yellow' }}
          />
        </Toolbar>
        <List>
          {hradmin === 'true' ? (
            <>
              <ListItem
                button
                selected={selectedItem === 'Employee'}
                onClick={() => handleItemClick('Employee')}
                sx={{ '&:hover': { backgroundColor: '#EDAF28' } }}
              >
                <ListItemIcon>
                  <BadgeIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Employee" />
              </ListItem>
              <ListItem
                button
                selected={selectedItem === 'Customer'}
                onClick={() => handleItemClick('Customer')}
                sx={{ '&:hover': { backgroundColor: '#EDAF28' } }}
              >
                <ListItemIcon>
                  <BadgeIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                selected={selectedItem === 'MenuManage'}
                onClick={() => handleItemClick('MenuManage')}
                sx={{ '&:hover': { backgroundColor: '#EDAF28' } }}
              >
                <ListItemIcon>
                  <MenuOpenIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Menu Management" />
              </ListItem>
              <ListItem
                button
                selected={selectedItem === 'InventoryManage'}
                onClick={() => handleItemClick('InventoryManage')}
                sx={{ '&:hover': { backgroundColor: '#EDAF28' } }}
              >
                <ListItemIcon>
                  <InventoryIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Inventory Management" />
              </ListItem>
              <ListItem
                button
                selected={selectedItem === 'SupportTicket'}
                onClick={() => handleItemClick('SupportTicket')}
                sx={{ '&:hover': { backgroundColor: '#EDAF28' } }}
              >
                <ListItemIcon>
                  <ConfirmationNumberIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Support Ticket Management" />
              </ListItem>
              <ListItem
                button
                selected={selectedItem === 'PromotionManage'}
                onClick={() => handleItemClick('PromotionManage')}
                sx={{ '&:hover': { backgroundColor: '#EDAF28' } }}
              >
                <ListItemIcon>
                  <LocalOfferIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Promotion Management" />
              </ListItem>
              <ListItem
                button
                selected={selectedItem === 'OrderPaymentManage'}
                onClick={() => handleItemClick('OrderPaymentManage')}
                sx={{ '&:hover': { backgroundColor: '#EDAF28' } }}
              >
                <ListItemIcon>
                  <AllInboxIcon sx={{ color: '#ecf0f1' }} />
                </ListItemIcon>
                <ListItemText primary="Order Payment Management" />
              </ListItem>
            </>
          )}
        </List>
        <List sx={{ marginTop: 'auto' }}>
          <ListItem button onClick={handleLogout} sx={{ '&:hover': { backgroundColor: '#2c3e50' } }}>
            <LogoutIcon>
              <InventoryIcon sx={{ color: '#ecf0f1' }} />
            </LogoutIcon>
            <ListItemText primary="Logout" sx={{ paddingLeft: '50px' }} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
