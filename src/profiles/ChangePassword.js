import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import axios from 'axios';

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChangePassword = async () => {
    if (!password || !password2) {
      setError("All fields are required!");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/user/changepassword/',
        {
          password: password,
          password2: password2
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`
          }
        }
      );

      if (response.status === 200) {
        setSuccess("Password changed successfully!");
        setError('');
        setPassword('');  // Clear the password field
        setPassword2(''); // Clear the confirm password field
      } else {
        setError("Failed to change password. Please try again.");
        setSuccess('');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(Object.values(error.response.data.errors).flat().join(', '));
      } else {
        setError('Failed to change password. Please try again.');
      }
      setSuccess('');
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
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {error && <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>{error}</Typography>}
        {success && <Typography color="success" variant="body2" sx={{ marginTop: 2 }}>{success}</Typography>}
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