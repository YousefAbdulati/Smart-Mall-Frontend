import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  Container,
  Typography,
  Box,
  Rating,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { reviewModalOpen } from "../redux/ReviewSlice";
import AddReviewDialog from "../home/modals/NewReviews";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";

const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: "teal",
  color: "white",
  "&:hover": {
    backgroundColor: "#00695c", // darken teal for hover effect if needed
  },
}));

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details using the productId
    axios.get(`http://127.0.0.1:8000/api/products/${productId}/`).then((response) => {
      setProduct(response.data);
    });
  }, [productId]);

  const handleOpenReviewDialog = () => {
    dispatch(reviewModalOpen());
  };

  const handleShowReviews = () => {
    axios.get(`http://127.0.0.1:8000/api/products/${productId}/reviews/`)
      .then(response => {
        console.log(response.data); // Assuming response.data is an array of reviews
        // Handle reviews display or navigation to reviews page
        navigate(`/reviews/${productId}`);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        // Handle error scenarios if needed
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{margin:"20px", backgroundColor:"teal", padding:"10px", width:"fit-content", color:"white", borderRadius:"8px"}}
      >{`< `} <Link style={{color:"white", textDecoration:"none"}} to={"/home"}>GO Back</Link></div>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: 3,
          maxWidth: 900,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                maxWidth: 400,
                height: "auto",
                borderRadius: 1,
              }}
              image={product.image}
              title={product.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h6" color="red" fontWeight="bold">
                Old Price:
                <span style={{ textDecoration: "line-through", marginLeft: 4 }}>
                {product.old_price} £ 
                </span>
              </Typography>
              <Typography
                variant="h5"
                color="green"
                fontWeight="bold"
                sx={{ marginTop: 1 }}
              >
                Current Price:{product.price} £ 
              </Typography>
              <Typography variant="h5" color="teal" fontWeight="bold" sx={{ marginTop: 1 }}>
                Stock: {product.stock}
              </Typography>

              <div
                style={{ display: "flex", alignItems: "center", marginTop: 7 }}
              >
                <Rating
                  name="text-feedback"
                  value={product.avg_rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <span style={{ marginLeft: 8 }}>({product.rating_count})</span>
              </div>

              <TealButton
                sx={{ mb: 2, mt: 1 }}
                onClick={handleOpenReviewDialog}
                variant="contained"
              >
                Add Review
              </TealButton>
              <AddReviewDialog />
              <TealButton onClick={handleShowReviews} variant="contained">
                Show Reviews
              </TealButton>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
    </>
  );
}
