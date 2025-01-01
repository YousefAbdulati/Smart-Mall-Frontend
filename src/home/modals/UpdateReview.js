// UpdateReview.js

import React, { useState,useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Rating
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from "@mui/material/styles";


const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: "teal",
  color: "white",
  "&:hover": {
    backgroundColor: "#00695c", // darken teal for hover effect if needed
  },
}));

const UpdateReview = () => {
  const { productId, reviewId } = useParams(); // Assuming you have productId and reviewId in URL params
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to fetch review details on component mount
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${productId}/reviews/${reviewId}/`)
      .then(response => {
        setName(response.data.name);
        setDescription(response.data.description);
        setRating(response.data.rating);
      })
      .catch(error => {
        console.error('Error fetching review:', error);
      });
  }, [productId, reviewId]);

  const handleUpdateReview = () => {
    // API call to update review
    axios.put(`http://127.0.0.1:8000/api/products/${productId}/reviews/${reviewId}/`, {
      name,
      description,
      rating
    })
      .then(response => {
        setSuccess('Review updated successfully!');
        setError('');
      })
      .catch(error => {
        setError('Failed to update review. Please try again.');
        setSuccess('');
      });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Edit Review
        </Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        {success && <Typography color="success" variant="body2">{success}</Typography>}
        <TealButton
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleUpdateReview}
        >
          Update Review
        </TealButton>
      </Box>
    </Container>
  );
};

export default UpdateReview;