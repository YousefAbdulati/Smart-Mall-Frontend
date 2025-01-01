import "./App.css";
import Login from "./login/Login";
import Home from "./home/Home";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Product from "./product/Product";
// import UserProfile from "./profiles/UserProfile";
import AllProfiles from "./profiles/AllProfiles";
import Review from "./product/Review";
import ChangePassword from "./profiles/ChangePassword";
import ResetPassword from "./profiles/ResetPassword";
import UserProfileDetail from "./profiles/UserProfileDetail";
import UpdateReview from "./home/modals/UpdateReview";
import AboutUs from "./home/AboutUs";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reviews/:productId" element={<Review />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/update-review/:productId/:reviewId"element={<UpdateReview />} />
        <Route path="/profiles/:id" element={<UserProfileDetail />} />

        {/* <Route path="/profiles/:userId" element={<UserProfile />} /> */}
        <Route path="/allprofiles" element={<AllProfiles />} />
        <Route path="/about-us" element={<AboutUs />} />
        

        
      </Routes>
    </div>



  );
}

export default App;