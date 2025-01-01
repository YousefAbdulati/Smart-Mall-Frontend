import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
import { signModalClose } from "../../redux/sidebarBtnsSlice";
import { FormControl, InputLabel, Stack, TextField, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { createAccount } from "../../redux/AccountSlice";
import { styled } from "@mui/material/styles";


const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: "teal",
  color: "white",
  "&:hover": {
    backgroundColor: "#00695c", // darken teal for hover effect if needed
  },
}));

export default function NewSign() {
  const open = useSelector((state) => state.sidebarBtns.signModal);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    dispatch(signModalClose());
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleCreateAccount = async () => {
    setError("");  // Clear previous errors
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password2", confirmPassword);
    formData.append("date_of_birth", dob);
    formData.append("address", address);
    formData.append("nationality", nationality);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("is_admin", isAdmin);
    if (image) {
      formData.append("image", image);
    }

    try {
      await dispatch(createAccount(formData)).unwrap();
      handleClose();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: "bold", color: "teal", textAlign: "center" }}
      >
        New Account
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "330px",
          gap: "20px",
          padding: "20px",
        }}
      >
        {error && <div style={{ color: "red" }}>{error}</div>}
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ marginTop: "10px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <TealButton variant="outlined" component="label" fullWidth>
          Upload Image
          <input type="file" hidden onChange={handleImageUpload} />
        </TealButton>
        <TextField
          id="dob"
          label="Date Of Birth"
          variant="outlined"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          id="nationality"
          label="Nationality"
          variant="outlined"
          fullWidth
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
        <TextField
          id="phone"
          label="Phone"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" spacing={0} alignItems="center">
          <span>Is Admin</span>
          <Switch
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <TealButton onClick={handleClose} color="error" variant="contained">
          Close
        </TealButton>
        <TealButton onClick={handleCreateAccount} color="success" variant="contained">
          Create
        </TealButton>
      </DialogActions>
    </Dialog>
  );
}
