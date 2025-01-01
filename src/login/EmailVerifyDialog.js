import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography } from "@mui/material";
import { emailVerifyModalClose } from "../redux/sidebarBtnsSlice"; // Action to close the modal

export default function EmailVerifyDialog() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const open = useSelector((state) => state.sidebarBtns.emailVerifyModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(emailVerifyModalClose());
  };

  const handleEmailVerify = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Logic to send verification email to the provided email address
    console.log("Verification email sent to:", email);
    handleClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear error when the user starts typing
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="email-verify-dialog-title"
      aria-describedby="email-verify-dialog-description"
    >
      <DialogTitle
        id="email-verify-dialog-title"
        sx={{ fontWeight: "bold", color: "green", textAlign: "center" }}
      >
        Verify Email
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
        <Typography>Send a verification link to your email</Typography>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Close
        </Button>
        <Button onClick={handleEmailVerify} color="success" variant="contained">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
