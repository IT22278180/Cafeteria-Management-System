import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Paper,
  Grid,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Navbar from '../Main/NavBar.js';
import Footer from '../Main/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    paddingBottom:'175px'
  },
  title: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    marginLeft: '160px',
    marginRight: '160px'
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  buttonGroup: {
    marginLeft: 'auto',
  },
  totalAmount: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const CartPage = () => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleChangeQuantity = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleClearCart = () => {
    localStorage.setItem('checkoutItems', JSON.stringify([]));
    localStorage.setItem('cartItems', JSON.stringify([]));
    window.location.href = '/MenuPage';
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateCalories = () => {
    return cartItems.reduce((total, item) => total + item.calorieCount * item.quantity, 0);
  };

  const handleCheckout = () => {
    const checkoutItems = {
      items: cartItems,
      totalPrice: calculateTotal(),
      orderID: Math.floor(Math.random() * 1000000) + 1,
    };
    localStorage.setItem('checkoutItems', JSON.stringify(checkoutItems));
    window.location.href = '/CheckoutPage';
  };
  

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom className={classes.title}>
          Manage Cart
        </Typography>
        <hr />
        <br />
        {cartItems.map((item) => (
          <Card key={item.id} className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={item.picture}
              title={item.name}
              style={{ height: 160, width: 160 }}
            />
<div className={classes.cardDetails}>
              <CardContent>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: 18 }}>{item.itemName}</Typography>
                <Typography variant="subtitle2" color="">
                  Price: ${item.price}
                </Typography>
                <Typography variant="subtitle2" color="">
                  Calories: {item.calorieCount}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Quantity:
                  <input
                    type="number"
                    style={{ width: 50, marginLeft: 10 }}
                    value={item.quantity}
                    onChange={(e) => handleChangeQuantity(item.id, parseInt(e.target.value))}
                    min={1}
                  />
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="remove" onClick={() => handleRemoveFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </div>

            </Card>
        ))}

{cartItems.length === 0 && (
          <Typography variant="subtitle1" color="textSecondary">
            Your cart is empty.
          </Typography>
        )}
        {cartItems.length > 0 && (
          <div style={{ marginLeft: '160px', marginRight: '160px' }}>
            <Typography variant="h6" gutterBottom className={classes.totalAmount}>
              Total Price: Rs. {calculateTotal()}
            </Typography>
            <Typography variant="h6" gutterBottom className={classes.totalAmount}>
              Total Calories: {calculateCalories()} kCal
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" style={{backgroundColor:'red', color:'white'}} onClick={handleClearCart}>
                  Clear Cart
                </Button>
              </Grid>
              <Grid item className={classes.buttonGroup}>
                <Button variant="contained" color="primary" onClick={handleCheckout}>
                  Check Out
                </Button>
              </Grid>
            </Grid>
          </div>
        )}

      </div>
    </>

  );
};

export default CartPage;
