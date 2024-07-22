import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from '@material-ui/core';
import Navbar from '../Main/NavBar';
import NavbarLog from '../Main/LogInNavbar';
import Footer from '../Main/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: theme.palette.dark,
        color: theme.palette.primary,
        paddingTop: theme.spacing(4),
        textAlign: 'center',
    },
    headerText: {
        fontSize: '14px',
        letterSpacing: '2px',
    },
    section: {
        marginTop: theme.spacing(15),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(4),
    },
    card: {
        maxWidth: '100%',
        margin: theme.spacing(2),
    },
    cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function AboutUs() {
    const classes = useStyles();
    const email = sessionStorage.getItem("cusmail");

    return (
        <div className={classes.root}>
            {email === null || email === 'empty' ? (
                <NavbarLog />
            ) : (
                <Navbar />
            )}
            <div className={classes.header}>
                <Typography variant="h3" component="h1">About Us</Typography>
            </div>
            <hr style={{ width: 100, }}></hr>
            <section className={classes.section}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image='https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                title="Event Image"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h4">Introduction</Typography>
                                <Typography variant="body2" color="textSecondary" style={{ fontSize: 18, fontWeight: 'bold' }}>
                                    Welcome to Caravan Fresh, where every bite is a journey of flavor and every creation is crafted with passion. As purveyors of happiness, we offer a tempting array of handcrafted cakes, pastries, and confections that delight the senses. From classic cakes to avant-garde creations, our master bakers use only the finest ingredients to create culinary masterpieces that are both beautiful and delicious. Join us on a culinary adventure where every moment is a feast for the senses.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" spacing={2} className={classes.section}>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h4" >Key Features</Typography>
                                <Typography variant="body2" color="textSecondary" style={{ fontSize: 18, fontWeight: 'bold' }}>

                                    At Caravan Fresh, we pride ourselves on being more than just a cake and pastry shop; we're creators of unforgettable experiences. What sets us apart are the meticulous details woven into every treat we offer. Our master bakers infuse their expertise and passion into each handcrafted delight, ensuring that every bite is a testament to our commitment to excellence. We spare no expense in sourcing the finest ingredients, believing that quality is paramount in achieving the perfect balance of flavors and textures.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image='https://images.pexels.com/photos/1089570/pexels-photo-1089570.jpeg?auto=compress&cs=tinysrgb&w=600'
                                title="Event Image"
                            />
                        </Card>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" spacing={2} className={classes.section} style={{ paddingBottom: '50px' }}>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" style={{ fontWeight: 'bold', }}>Objectives</Typography>
                                <Typography variant="body2" color="textSecondary" style={{ fontSize: 16, fontWeight: 'bold', height: 170, }}>
                                    Caravan Fresh specializes in handcrafted cakes, pastries, and confections, using only the finest ingredients sourced from trusted suppliers. Our master bakers craft each treat with precision and care, offering a diverse range of both classic and avant-garde creations. Personalized service ensures a delightful experience for every customer.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" style={{ fontWeight: 'bold', }}>Vision</Typography>
                                <Typography variant="body2" color="textSecondary" style={{ fontSize: 16, fontWeight: 'bold', height: 170, }}>
                                    Our vision at Caravan Fresh is to redefine the art of pastry-making, inspiring joy and delight with every creation. We aim to be the epitome of culinary excellence, known for our innovative flavors, meticulous craftsmanship, and unparalleled commitment to customer satisfaction, creating unforgettable moments one bite at a time.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" style={{ fontWeight: 'bold', }}>Mission</Typography>
                                <Typography variant="body2" color="textSecondary" style={{ fontSize: 16, fontWeight: 'bold', height: 170, }}>
                                    Our mission at Caravan Fresh is to delight customers with exquisite handcrafted treats, elevating every occasion with our culinary expertise. We strive to use the finest ingredients, innovate constantly, and provide personalized service, ensuring that every experience with us is a journey of flavor and a celebration of happiness.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </section>
            <Footer />
        </div>
    );
}

export default AboutUs;
