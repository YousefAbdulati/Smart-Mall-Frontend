import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/products/";


// Thunk to fetch  category
export const fetchCategory = createAsyncThunk(
  " category/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories/");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// // Thunk to create a new product
// export const createProduct = createAsyncThunk(
//   "products/createProduct",
//   async (productData, { rejectWithValue, dispatch }) => {
//     try {
//       await axios.post(API_URL, productData);
//       dispatch(fetchProducts());
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );



// Create the category slice
const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [], // Make sure products is initialized as an array
   
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
    
    
   
  },
});

export default categorySlice.reducer;