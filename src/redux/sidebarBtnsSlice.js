import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar btn",
  initialState: {
    productModal: false,
    categoryModal: false,
    signModal: false,
    emailVerifyModal: false,
  },
  reducers: {
    productModalOpen: (state) => {
      state.productModal = true;
    },
    productModalClose: (state) => {
      state.productModal = false;
    },
    categoryModalOpen: (state) => {
      state.categoryModal = true;
    },
    categoryModalClose: (state) => {
      state.categoryModal = false;
    },
    signModalOpen: (state) => {
      state.signModal = true;
    },
    signModalClose: (state) => {
      state.signModal = false;
    },
 
   
  },
});

// Action creators are generated for each case reducer function
export const {
  productModalOpen,
  productModalClose,
  categoryModalOpen,
  categoryModalClose,
  signModalOpen,
  signModalClose,
 
  
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
