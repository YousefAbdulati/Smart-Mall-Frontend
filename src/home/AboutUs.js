import * as React from "react";
import { Container, Typography, Grid, Box, Avatar, Paper } from "@mui/material";
import Nav from "../home/Nav";
import image1 from "../image/1.jpg";
import image2 from "../image/2.jpg";
import doctorImage from "../image/10.jpg"; 
import image6 from "../image/6.jpg"; 
import image7 from "../image/7.jpg"; 
import image8 from "../image/8.jpg"; 
import image9 from "../image/9.jpg"; 
import Footer from "./Footer";
import AboutNav from "./AboutNav";


const AboutUs = () => {
  return (
    <>
    <AboutNav/>
      <Container maxWidth="lg" sx={{ marginTop: 0, paddingTop: "70px" }}>
      <br/><br/>
        <Typography variant="h3" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" align="center" paragraph>
          Welcome to our company! We are dedicated to delivering the best services to our customers.
        </Typography>

        <Grid container spacing={4} alignItems="center" sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                Our mission is to provide high-quality products and services that improve the lives of our customers. We strive for excellence in everything we do, from our customer service to the products we offer.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                alt="Mission Image"
                src={image1}
                sx={{ width: 300, height: 300, borderRadius: '50%' }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                alt="Vision Image"
                src={image2}
                sx={{ width: 300, height: 300, borderRadius: '50%' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                We envision a world where our products and services make a meaningful difference in the lives of people everywhere. Our vision is to be a leader in our industry and to continue innovating and improving.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <br/><br/>

        <hr/><hr/>

        <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
        Supervised by
        </Typography>
        <Grid container spacing={4} alignItems="center" >
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4" gutterBottom>
                Dr. Tamer Sami Ismail Jaafar
              </Typography>
              <Typography variant="body1" paragraph>
                The head of the Engineers Syndicate in Al-Sharqia. Assistant Professor in the Department of Computer and Systems Engineering.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} mb={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                alt="Doctor Image"
                src={doctorImage}
                sx={{ width: 400, height: 400, borderRadius: '50%' }}
              />
            </Box>
          </Grid>
        </Grid>
        </Box>
        <br/>


        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
           Our Team
          </Typography>
          <br/><br/>
          <Grid container spacing={4} justifyContent="center" sx={{ mb: "8px" }}>
            <Grid item>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Avatar src={image7} sx={{ width: 150, height: 150, margin: '0 auto 10px' }} />
                <Typography variant="h6">Youssef Haggag</Typography>
                <Typography variant="body2">Backend developer</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Avatar src={image8} sx={{ width: 150, height: 150, margin: '0 auto 10px' }} />
                <Typography variant="h6">Mohamed Abdellatif</Typography>
                <Typography variant="body2">Backend developer</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Avatar src={image6} sx={{ width: 150, height: 150, margin: '0 auto 10px' }} />
                <Typography variant="h6">Reham Kamal Eldin</Typography>
                <Typography variant="body2">Frontend developer</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <br/><br/>
      <Footer />
    </>
  );
};

export default AboutUs;