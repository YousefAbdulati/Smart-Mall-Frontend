import React, { useState, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import { Link, Button, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllProfiles() {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  // Base URL for your backend server
  const baseURL = 'http://127.0.0.1:8000';

  // Function to fetch profiles from backend
  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/user/profiles/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
        }
      });
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  // Fetch profiles when the component mounts
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Memoized profile list to optimize rendering
  const profileList = useMemo(() => {
    return profiles?.map((profile) => {
      const imageUrl = profile.image ? `${baseURL}${profile.image}` : 'default-image-url.jpg';

      return (
        <Card
          key={profile.id}
          sx={{
            width: 300,
            cursor: "pointer",
            transition: ".8s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "&:hover": {
              transform: "scale(1.03) !important",
            },
          }}
          onClick={() => handleProfileClick(profile.id)} // Handle click on profile card
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: 200, objectFit: "cover" }}
            image={imageUrl}
            title="profile image"
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              {profile.name}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <Button component={Link} to={`/profiles/${profile.id}`} variant="contained">
              View profile
            </Button>
          </Box>
        </Card>
      );
    });
  }, [profiles]);

  // Function to handle click on profile card
  const handleProfileClick = (profileId) => {
    // Navigate to profile detail page with profileId
    navigate(`/profiles/${profileId}`);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "50px 0",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {profileList}
    </div>
  );
}
