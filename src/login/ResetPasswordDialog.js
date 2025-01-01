import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography } from "@mui/material";
import { resetPasswordModalClose } from "../redux/loginSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordDialog() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetData, setResetData] = useState({})
  const open = useSelector((state) => state.login.resetPasswordModal);
  const dispatch = useDispatch();

  let navigate = useNavigate()

  const handleClose = () => {
    dispatch(resetPasswordModalClose());
  };

  const handleResetPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/send-reset-password-email/", { email });
      setSuccessMessage("Reset password link sent to your email.");
      setErrorMessage("");



      setResetData(response.data)

      localStorage.setItem("ResetToken", response.data.token)
      localStorage.setItem("ResetUID", response.data.uid)
      
      // localStorage.removeItem("ResetData")


      
      
    } catch (error) {
      setErrorMessage("Failed to send reset password link. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="reset-password-dialog-title"
      aria-describedby="reset-password-dialog-description"
    >
      <DialogTitle
        id="reset-password-dialog-title"
        sx={{ fontWeight: "bold", color: "green", textAlign: "center" }}
      >
        Reset Password
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
        <Typography>Send link to your email</Typography>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          sx={{ marginTop: "10px" }}
        />
        {successMessage && (
          <Typography variant="body2" color="success">
            {successMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Close
        </Button>
        <Button onClick={handleResetPassword} color="success" variant="contained">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
