import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UserProfileDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch user profile from backend
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/profiles/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  // Base URL for your backend server
  const baseURL = 'http://127.0.0.1:8000';
  const imageUrl = user.image ? `${baseURL}${user.image}` : 'default-image-url.jpg'; // Handle missing image

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        padding: "20px"
      }}
    >
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          maxWidth: "500px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          backgroundColor: "#fff"
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          title={user.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            margin: "0 auto 20px",
            objectFit: "cover"
          }}
        />
        <CardContent>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            {user.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Gender:
                </Typography>
                <Typography variant="body1">{user.gender}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Nationality:
                </Typography>
                <Typography variant="body1">{user.nationality}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Date of Birth:
                </Typography>
                <Typography variant="body1">{user.date_of_birth}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Address:
                </Typography>
                <Typography variant="body1">{user.address}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Phone:
                </Typography>
                <Typography variant="body1">{user.phone}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
