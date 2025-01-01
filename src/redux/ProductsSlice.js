import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/products/";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("access")}`,
  "Content-Type": "multipart/form-data",
};

// Thunk to fetch products with pagination
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1 } = {}, { rejectWithValue, getState }) => {
    const { filter, search } = getState().products;
    let url = `${API_URL}?page=${page}`;
    if (filter) {
      url += `&category_id=${filter}`;
    }
    if (search) {
      url += `&search=${search}`;
    }
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to create a new product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(API_URL, productData ,{headers});
      dispatch(fetchProducts()); // Refetch products after creating
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue, dispatch }) => {
    try {
      await axios.put(`${API_URL}${id}/`, productData ,{headers});
      dispatch(fetchProducts()); // Refetch products after updating
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${API_URL}${productId}/`,{headers});
      dispatch(fetchProducts()); // Refetch products after deleting
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to search products
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (word, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setSearch(word));
      dispatch(fetchProducts({ page: 1 }));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to filter products
export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async (catId, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setFilter(catId));
      dispatch(fetchProducts({ page: 1 }));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the products slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    filter: null,
    search: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products reducers
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 6); // Assuming page_size is 6
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Product reducers
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Product reducers
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Product reducers
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search Product reducers
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Filter Product reducers
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const { setPage, setFilter, setSearch } = productsSlice.actions;

export default productsSlice.reducer;
