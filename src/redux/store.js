import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import sidebarBtnsReducer from "./sidebarBtnsSlice";
import reviewsReducer from "./ReviewSlice";
import productsReducer from './ProductsSlice';
import authReducer from "./AuthSlice"
import profileReducer from "./fetchUserProfile"
import categoryReducer from "./categorySlice"
// import { productApi } from '../product/GetProduct';

const store = configureStore({
  reducer: {
    sidebarBtns: sidebarBtnsReducer,
    login: loginReducer,
    reviews: reviewsReducer,
    products: productsReducer,
    category: categoryReducer,
    auth: authReducer,
    profile: profileReducer,
    // [productApi.reducerPath]: productApi.reducer,
  },
  

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productApi.middleware),
});

export default store;