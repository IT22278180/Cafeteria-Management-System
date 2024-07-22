import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link, useLocation} from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? { color: '#FFA500', fontWeight: 'bold' } : { color: '#fff' };
  };
  const handleLogout = () => {
    sessionStorage.setItem('cusmail', 'empty');
    window.location.href = '/';
  };
  return (
    <AppBar position="static" style={{ backgroundColor: '#006400' }}>
      <Toolbar>
        <Typography variant="h4" style={{ flexGrow: 1, paddingLeft:'25px',fontWeight: 'bold', fontFamily: 'Adrianna, sans-serif' }}>
          <Link to="/" style={{ ...isActive('/'), textDecoration: 'none' }}>Caravan <span style={{ fontFamily: 'Zekton, sans-serif' }}>Fresh</span>
          </Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', ...isActive('/') }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', ...isActive('/MenuPage') }}>
          <Link to="/MenuPage" style={{ color: '#fff', textDecoration: 'none' }}>Menu</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', ...isActive('/CartPage') }}>
          <Link to="/CartPage" style={{ color: '#fff', textDecoration: 'none' }}>Cart</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', ...isActive('/AboutUs') }}>
          <Link to="/AboutUs" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', ...isActive('/Feeback') }}>
          <Link to="/Feeback" style={{ color: '#fff', textDecoration: 'none' }}>Feedback</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', ...isActive('/Support') }}>
          <Link to="/Support" style={{ color: '#fff', textDecoration: 'none' }}>Support</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', ...isActive('/Orders') }}>
          <Link to="/Orders" style={{ color: '#fff', textDecoration: 'none' }}>Your Orders</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', ...isActive('/Profile') }}>
          <Link to="/Profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none' }}>Log Out</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
