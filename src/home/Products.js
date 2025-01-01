import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
  setPage,
} from "../redux/ProductsSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Rating,
  Menu,
  MenuItem,
  Checkbox,
  Link,
  FormControlLabel,
  Box,
  Pagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";


const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: "teal",
  color: "white",
  "&:hover": {
    backgroundColor: "#00695c", // darken teal for hover effect if needed
  },
}));

export default function Products() {
  const dispatch = useDispatch();
  const { products, page, totalPages } = useSelector((state) => state.products);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    price: null,
    stock: null,
    discount: false,
    old_price: null,
    top_deal: false,
    flash_sales: false,
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedProductForMenu, setSelectedProductForMenu] = useState(null);
  const navigate = useNavigate();
  let userToken = localStorage.getItem("access")

  useEffect(() => {
    dispatch(fetchProducts({ page }));
  }, [dispatch, page]);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenUpdateDialog = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct(product);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    handleCloseDialog();
  };

  const handleUpdateProduct = () => {
    const updatedProductData = {
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      stock: updatedProduct.stock,
      discount: updatedProduct.discount,
      old_price: updatedProduct.old_price,
      top_deal: updatedProduct.top_deal,
      flash_sales: updatedProduct.flash_sales,
      category: updatedProduct.category,
    };

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      for (const key in updatedProductData) {
        formData.append(key, updatedProductData[key]);
      }

      dispatch(updateProduct({ id: selectedProduct.id, productData: formData }));
    } else {
      dispatch(updateProduct({ id: selectedProduct.id, productData: updatedProductData }));
    }

    handleCloseUpdateDialog();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleMenuOpen = (event, product) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedProductForMenu(product);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedProductForMenu(null);
  };

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
  };

  const productList = useMemo(() => {
    return products?.map((product) => (
      <Card
        key={product.id}
        sx={{
          mt:"100px",
          width: 300,
          cursor: "pointer",
          transition: ".8s",
          "&:hover": {
            transform: "scale(1.03) !important",
          },
        }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%", height: 240, objectFit: "cover" }}
          image={product.image}
          title="product image"
        />
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <h3 style={{ color: "green" }}>{product.price} £</h3>
        </CardContent>
        <CardActions>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="text-feedback"
                value={product.avg_rating}
                readOnly
                precision={0.5}
              />
              <span>({product.rating_count})</span>
            </div>

            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(event) => handleMenuOpen(event, product)}
            >
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </CardActions>
        <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
          <TealButton component={Link} to={`/product/${product.id}`} variant="contained">
            View Product
          </TealButton>
        </Box>
      </Card>
    ));
  }, [products, navigate]);

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Ensures the container spans the entire viewport height
        padding: "20px",
      }}
    >
      {/* Product List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        {productList}
      </div>
      {/* Pagination Bar at the Bottom */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="standard"
          shape="rounded"
        />
      </div>
      {/* Menu for Product Actions */}
      {userToken? <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleOpenUpdateDialog(selectedProductForMenu);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteProduct(selectedProductForMenu.id);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Cancel</MenuItem>
      </Menu>
      :""
      }
     
      {/* Update Dialog */}
      <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the details of the product.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={updatedProduct.name || ""}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={updatedProduct.description || ""}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                description: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            type="number"
            value={updatedProduct.price || ""}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, price: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Stock"
            fullWidth
            type="number"
            value={updatedProduct.stock || ""}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, stock: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={updatedProduct.discount}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    discount: e.target.checked,
                  })
                }
              />
            }
            label="Discount"
          />
          <TextField
            margin="dense"
            label="Old Price"
            fullWidth
            type="number"
            value={updatedProduct.old_price || ""}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, old_price: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={updatedProduct.top_deal}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    top_deal: e.target.checked,
                  })
                }
              />
            }
            label="Top Deal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={updatedProduct.flash_sales}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    flash_sales: e.target.checked,
                  })
                }
              />
            }
            label="Flash Sales"
          />
          {/* <TextField
            margin="dense"
            label="Category"
            fullWidth
            value={updatedProduct.category || ""}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                category: e.target.value,
              })
            }
          /> */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{selectedProduct?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteProduct(selectedProduct?.id)}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
