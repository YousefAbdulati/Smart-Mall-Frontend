import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography, Rating } from "@mui/material";
import { reviewModalClose, postReview } from "../../redux/ReviewSlice";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";


const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: "teal",
  color: "white",
  "&:hover": {
    backgroundColor: "#00695c", // darken teal for hover effect if needed
  },
}));

export default function AddReviewDialog() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [emailError, setEmailError] = useState("");
  const open = useSelector((state) => state.reviews.reviewModal);
  const dispatch = useDispatch();
  const { productId } = useParams(); // Fetch productId from URL params

  const handleClose = () => {
    dispatch(reviewModalClose());
  };

  const handleSubmitReview = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Prepare review data to be sent to the backend
    const reviewData = {
      name,
      email,
      rating,
      description,
    };

    // Dispatch an action to post the review to the backend
    dispatch(postReview({ productId, reviewData }));

    // Close the dialog after submitting
    handleClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-review-dialog-title"
      aria-describedby="add-review-dialog-description"
    >
      <DialogTitle
        id="add-review-dialog-title"
        sx={{ fontWeight: "bold", color: "teal", textAlign: "center" }}
      >
        Add Review
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "350px",
          gap: "20px",
          padding: "20px",
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
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginTop: "10px" }}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <TealButton onClick={handleClose} color="error" variant="contained">
          Close
        </TealButton>
        <TealButton onClick={handleSubmitReview} color="success" variant="contained">
          Submit
        </TealButton>
      </DialogActions>
    </Dialog>
  );
}
