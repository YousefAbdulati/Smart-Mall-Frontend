import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/AuthSlice"; // Adjust the path to your authSlice

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    dispatch(logoutUser());
    navigate("/");
  };

  return handleLogout;
};

export default useLogout;
