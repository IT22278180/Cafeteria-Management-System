import React, { useState, useEffect } from 'react';
import Navbar from '../Main/NavBar';
import NavbarLog from '../Main/LogInNavbar';
import Footer from '../Main/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 200,
  },
  carousel: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '700px',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  prevArrow: {
    left: theme.spacing(2),
  },
  nextArrow: {
    right: theme.spacing(2),
  },
  description: {
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: theme.spacing(2),
    width: '85%',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const email = sessionStorage.getItem("cusmail");

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep === carouselImages.length - 1 ? 0 : prevStep + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlePrevSlide = () => {
    setActiveStep((prevStep) => (prevStep === 0 ? carouselImages.length - 1 : prevStep - 1));
  };

  const handleNextSlide = () => {
    setActiveStep((prevStep) => (prevStep === carouselImages.length - 1 ? 0 : prevStep + 1));
  };

  const carouselImages = [
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (
    <div>
      {email === null || email === 'empty' ? (
        <NavbarLog />
      ) : (
        <Navbar />
      )}
      <div className={classes.root}>
        <Typography variant="h2" align="center" className={classes.title} style={{ fontWeight: 'bold', }}>
          Welcome to <span style={{ color: 'orange' }}>Caravan-Fresh</span>
          <hr style={{ width: '600px' }} />
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={'auto'} >
            <div className={classes.carousel}>
              <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
                {carouselImages.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Carousel Image ${index + 1}`} className={classes.carouselImage} />
                  </div>
                ))}
              </SwipeableViews>
              <Typography variant="body1" className={classes.description} align="center">
                <Typography variant="h4" component="h3" gutterBottom style={{ fontWeight: 'bold' }}>
                  Caravan - Fresh
                </Typography>
                <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: 'lighter' }}>
                  Welcome to Caravan Fresh, your gateway to gourmet delights and sweet sensations! Step into our world of delectable treats where every bite is a journey of flavor and every creation is crafted with passion. At Caravan Fresh, we're more than just a cake and pastry shop – we're purveyors of happiness, serving up a tempting array of handcrafted cakes, pastries, and confections that are sure to delight your senses.
                </Typography>
              </Typography>

              <IconButton className={`${classes.arrow} ${classes.prevArrow}`} onClick={handlePrevSlide}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton className={`${classes.arrow} ${classes.nextArrow}`} onClick={handleNextSlide}>
                <ArrowForwardIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <hr />
        <Grid container justifyContent="center" spacing={4}>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://source.unsplash.com/featured/?pasta"
                  title="Pasta"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Pasta
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Indulge in our freshly baked pastries and desserts.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://source.unsplash.com/featured/?tea"
                  title="Tea"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Tea
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Discover our collection of exotic teas from around the world.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://source.unsplash.com/featured/?pastry"
                  title="Pastry"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Pastries
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Indulge in our freshly baked pastries and desserts.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <hr />
        <Typography variant="body1" style={{ paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#eeeeee' }} align="center">
          <Typography variant="h4" component="h3" gutterBottom style={{ fontWeight: 'bold' }}>
            Caravan Fresh <span style={{ color: 'orange' }}>Life</span>
            <hr style={{ width: '500px', }}></hr>
          </Typography>
          <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: 'lighter' }}>
            From classic cakes to avant-garde creations, our master bakers use only the finest ingredients to create culinary masterpieces that are as beautiful as they are delicious. Indulge in the rich, velvety texture of our signature cakes or savor the delicate layers of our artisanal pastries – each bite is a celebration of taste and tradition.
            Whether you're celebrating a special occasion or simply treating yourself to a little slice of heaven, Caravan Fresh is your destination for all things sweet and savory. Join us on a culinary adventure where every moment is a feast for the senses.
          </Typography>
        </Typography>
        <hr />
        <Grid container justifyContent="center" spacing={4}>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://source.unsplash.com/featured/?pizza"
                  title="Pizza"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Pizza
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Enjoy our wide selection of freshly brewed coffees.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://source.unsplash.com/featured/?icecream"
                  title="Icecream"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Ice Cream
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Discover our collection of exotic teas from around the world.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://source.unsplash.com/featured/?coffee"
                  title="Coffee"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Coffee
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Enjoy our wide selection of freshly brewed coffees.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
