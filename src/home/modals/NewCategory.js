import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { categoryModalClose } from "../../redux/sidebarBtnsSlice";
import { TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: "teal",
  color: "white",
  "&:hover": {
    backgroundColor: "#00695c", // darken teal for hover effect if needed
  },
}));

export default function NewCategory() {
  const open = useSelector((state) => state.sidebarBtns.categoryModal);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    dispatch(categoryModalClose());
  };
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
    "Content-Type": "multipart/form-data",
  };

  const handleCreate = () => {
    const categoryData = {
      title,
    };

    axios.post('http://127.0.0.1:8000/api/categories/', categoryData ,{headers})
      .then(response => {
        console.log('Category created successfully:', response.data);
        handleClose();
        fetchCategories(); 
        window.location.reload();// Refresh the category list after creation
      })
      .catch(error => {
        console.error('Error creating category:', error);
        setError(error);
      });
  };

  const fetchCategories = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
        New Category
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
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          fullWidth
          sx={{ marginTop: "10px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          categories.map((category) => (
            <div key={category.id}>{category.title}</div>
          ))
        )}
        {error && <div style={{ color: "red" }}>Error: {error.message}</div>}
      </DialogContent>
      <DialogActions>
        <TealButton onClick={handleClose} color="error" variant="contained">
          Close
        </TealButton>
        <TealButton onClick={handleCreate} color="success" variant="contained">
          Create
        </TealButton>
      </DialogActions>
    </Dialog>
  );
}
