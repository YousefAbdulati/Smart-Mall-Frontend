import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { productModalClose } from "../../redux/sidebarBtnsSlice";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { createProduct } from "../../redux/ProductsSlice"; // Adjust the import path as needed
import axios from "axios";
import { styled } from "@mui/material/styles";

const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: "teal",
  color: "white",
  "&:hover": {
    backgroundColor: "#00695c", // darken teal for hover effect if needed
  },
}));

export default function NewProduct() {
  const open = useSelector((state) => state.sidebarBtns.productModal);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState(false);
  const [topDeal, setTopDeal] = useState(false);
  const [flashSales, setFlashSales] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State to hold the selected image file
  const categories=useSelector(state=>state.category.category)

  

  const handleClose = () => {
    dispatch(productModalClose());
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value)
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleCreateProduct = () => {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("old_price", oldPrice);
    productData.append("stock", stock);
    productData.append("category", category);
    productData.append("discount", discount);
    productData.append("top_deal", topDeal);
    productData.append("flash_sales", flashSales);
    if (imageFile) {
      productData.append("image", imageFile);
    }

    // Dispatch action to create product
    dispatch(createProduct(productData));

    // Close the modal after submission (you may want to handle success/failure feedback)
    handleClose();
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
        New Product
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
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ marginTop: "10px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          type="number"
          inputProps={{ min: 0 }}
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          id="old_price"
          label="Old Price"
          variant="outlined"
          type="number"
          inputProps={{ min: 0 }}
          fullWidth
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />
        <TextField
          id="stock"
          label="Stock"
          variant="outlined"
          type="number"
          inputProps={{ min: 0 }}
          fullWidth
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        {/* <FormControlLabel
          sx={{ marginBottom: "5px" }}
          control={
            <Checkbox
              checked={discount}
              onChange={(e) => setDiscount(e.target.checked)}
            />
          }
          label="Discount"
        /> */}
        <FormControlLabel
          sx={{ marginBottom: "5px" }}
          control={
            <Checkbox
              checked={topDeal}
              onChange={(e) => setTopDeal(e.target.checked)}
            />
          }
          label="Top Deal"
        />
        <FormControlLabel
          sx={{ marginBottom: "5px" }}
          control={
            <Checkbox
              checked={flashSales}
              onChange={(e) => setFlashSales(e.target.checked)}
            />
          }
          label="Flash Sales"
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
          >
            {
              categories.map((category)=>{
              return <MenuItem value={category.category_id}>{category.title}</MenuItem>
              })
            }
      
          </Select>
        </FormControl>
        <TealButton variant="outlined" component="label" fullWidth>
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </TealButton>
      </DialogContent>
      <DialogActions>
        <TealButton onClick={handleClose} color="error" variant="contained">
          Close
        </TealButton>
        <TealButton onClick={handleCreateProduct} color="success" variant="contained">
          Create
        </TealButton>
      </DialogActions>
    </Dialog>
  );
}