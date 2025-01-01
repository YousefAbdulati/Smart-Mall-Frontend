// ReviewPage.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Container, Grid, Card } from "@mui/material";
import { fetchReviews } from "../redux/ReviewSlice";

export default function ReviewPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const error = useSelector((state) => state.reviews.error);

  useEffect(() => {
    dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!reviews.length) {
    return <Typography>No reviews for this product.</Typography>;
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: 3,
          maxWidth: 1200,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={3}>
          <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
              Product Reviews
            </Typography>
            {reviews.map((review, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Rating name="read-only" value={review.rating} readOnly />
                  <span>({review.rating_count})</span>
                </div>
                <Typography variant="h6">{review.name}</Typography>
                <Typography variant="body1">{review.description}</Typography>
                <hr style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
                {/* <Button
                  component={Link}
                  to={/update-review/${productId}/${review.id}}
                  variant="outlined"
                  color="primary"
                >
                  Edit Review
                </Button> */}
              </div>
            ))}
          </div>
        </Grid>
      </Card>
    </Container>
  );
}