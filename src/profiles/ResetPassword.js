// ChangePassword.js
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CleaningServices } from '@mui/icons-material';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  let navigate = useNavigate()

  let restUID = localStorage.getItem("ResetUID")
  let restToken = localStorage.getItem("ResetToken")


  // http://127.0.0.1:8000/api/user/reset-password/



  const handleChangePassword = async() => {

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/user/reset-password/${restUID}/${restToken}/`, {
        "password": newPassword ,
        "password2": confirmPassword
      });

    
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error.response?.data || error.message);
    }


    if (!newPassword || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

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
          Change Password
        </Typography>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        {success && <Typography color="success" variant="body2">{success}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleChangePassword}
        >
          Change Password
        </Button>
      </Box>
    </Container>
  );
}
