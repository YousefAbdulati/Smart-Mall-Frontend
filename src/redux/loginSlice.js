import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    resetPasswordModal: false,
  };
export const loginSplice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetPasswordModalOpen(state) {
      state.resetPasswordModal = true;
    },
    resetPasswordModalClose(state) {
      state.resetPasswordModal = false;
    },
   
  },
});


export const {
  
  resetPasswordModalClose,
  resetPasswordModalOpen,
 
  
} = loginSplice.actions;

export default loginSplice.reducer;
