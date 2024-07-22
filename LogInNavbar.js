import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#006400' }}>
      <Toolbar>
        <Typography variant="h4" style={{ flexGrow: 1, paddingLeft:'25px',fontWeight: 'bold', }}>
          <Link to="/New" style={{ color: '#FFA500', textDecoration: 'none' }}>Caravan Fresh</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/AboutUs" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/Login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
