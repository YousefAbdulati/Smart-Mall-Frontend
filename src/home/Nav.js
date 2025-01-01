import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "./SideBar";
import { Avatar, Stack ,Button} from "@mui/material";
import { useNavigate ,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProducts } from "../redux/ProductsSlice";
import { jwtDecode } from "jwt-decode"; // Correctly imported as named import
import image222 from "../image/222.jpg"; 
import  {useState} from 'react';



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));



export default function Nav() {
  const [openSide, setOpenSide] = React.useState(false);
  const [word, setWord] = React.useState("");
  const [decodeData, setDecodeData] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleHomeClick = () => {
    setLoading(true);
    // Add a small delay to show the loading indicator before refreshing
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  React.useEffect(() => {
    if (localStorage.getItem("access") != null) {
      let accessToken = localStorage.getItem("access");
      let decoded = jwtDecode(accessToken);
      localStorage.setItem("userID", decoded.user_id);
      setDecodeData(decoded);
    }
  }, []);

  React.useEffect(() => {
    dispatch(searchProducts(word));
  }, [word, dispatch]);

  function hadelOpenSide() {
    setOpenSide(true);
  }

  function hadelCloseSide() {
    setOpenSide(false);
  }

  return (
    <Box sx={{ flexGrow: 1 ,width:"100%",position:"fixed", zIndex:"100"}}>
      <AppBar position="static" sx={{ backgroundColor: "teal" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={hadelOpenSide}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link style={{color:"white", textDecoration:"none"}} to={"/"}>Smart Mall</Link>
          </Typography>
          <Button sx={{color:"white"}}onClick={handleHomeClick}>
            All Product
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </Search>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ marginLeft: "10px" }}
          >
            {decodeData ? (
              <Avatar
                alt="Mall"
                src={image222}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/profiles/${decodeData.user_id}`)}
              />
            ) : (
              ""
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <SideBar openSide={openSide} hadelCloseSide={hadelCloseSide} />
    </Box>
  );
}
