// ReviewSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/products";

// Thunk to fetch reviews for a product
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${productId}/reviews`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to post a new review
export const postReview = createAsyncThunk(
  "reviews/postReview",
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/${productId}/reviews/`, reviewData);
      return response.data;
      window.location.reload();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  reviewModal: false,
  selectedReview: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reviewModalOpen(state) {
      state.reviewModal = true;
    },
    reviewModalClose(state) {
      state.reviewModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload); // Add the new review to the state
      })
      .addCase(postReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reviewModalOpen, reviewModalClose } = reviewSlice.actions;
export default reviewSlice.reducer;
