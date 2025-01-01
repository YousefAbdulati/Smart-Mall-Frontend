import React, { useState } from "react";
import { Box, Card, CardContent, Button, Stack, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { resetPasswordModalOpen } from "../redux/loginSlice"; // Ensure this path is correct
import ResetPasswordDialog from "./ResetPasswordDialog"; // Ensure this path is correct
import backgroundImage from '../image/22.jpg';
import { jwtDecode } from "jwt-decode";


export default function Login() {
  // Start states
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // End states

  const handleOpenResetPasswordDialog = () => {
    dispatch(resetPasswordModalOpen());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/login/", {
        email,
        password,
      });
      // Handle successful login, e.g., save token, navigate to another page
      console.log("response of the loginnnnnnnnnn:", response);
      console.log("Login dataaaaaaaaaaaaaaa:", response.data);

      localStorage.setItem("userData", response.data);
      localStorage.setItem("access", response.data.token.access);
      localStorage.setItem("refresh", response.data.token.refresh);

      // Navigate to home page on successful login
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card
        sx={{
          boxShadow: 5,
          borderRadius: 3,
          overflow: 'hidden',
          width: isSmallScreen ? '100%' : '60%',
          height: isSmallScreen ? 'auto' : '70vh',
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: "rgba(25, 118, 210, 0.7)", // Transparent blue background
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Welcome to Our Mall!
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            If you want to see our products and offers, click the button below.
          </Typography>
          <Button
  variant="contained"
  color="secondary"
  onClick={() => navigate("/home")}
  sx={{
    mt: 2,
    transition: "transform 0.3s",
    '&:hover': {
      transform: "scale(1.1)",
    },
  }}
>
  View Products and Offers
</Button>
<br/>
<br/>
<Typography variant="h5" align="center" sx={{ mb: 4 }}>
            If you want Know more about us .
          </Typography>
<Button
  variant="contained"
  color="secondary"
  onClick={() => navigate("/about-us")}
  sx={{
    mt: 1,
    transition: "transform 0.3s",
    '&:hover': {
      transform: "scale(1.1)",
    },
  }}
>
AboutUs</Button>

        </Box>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 3 }}>
          <CardContent sx={{ width: "100%", maxWidth: 400 }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              Login
            </Typography>
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <form onSubmit={handleLogin}>
              <Stack spacing={3}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ padding: 1.5 }}
                >
                  Login
                </Button>
                <Button
                  variant="text"
                  color="error"
                  fullWidth
                  onClick={handleOpenResetPasswordDialog}
                >
                  Reset Password
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Box>
      </Card>
      <ResetPasswordDialog />
    </Box>
  );
}
