import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, Stack, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryModalOpen,
  productModalOpen,
  signModalOpen,
} from "../redux/sidebarBtnsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
import useLogout from "../logout/useLogout";
import { fetchCategory } from "../redux/categorySlice";
import { filterProducts } from "../redux/ProductsSlice";
import { styled } from "@mui/material/styles";


const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: "teal",
  color: "white",
  "&:hover": {
    backgroundColor: "#00695c", // darken teal for hover effect if needed
  },
}));




export default function SideBar({ openSide, hadelCloseSide }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = useLogout();


  const [userData, setUserData] = React.useState({})

    const categories=useSelector(state=>state.category.category)

    // const auth = useSelector(state=>state.auth.isAuthenticated)

    // console.log(auth)


    let userID = localStorage.getItem("userID")
    let userToken = localStorage.getItem("access")

    // console.log(userToken)

    // console.log(userID)



     React.useEffect(()=>{
      async function getUserData(){
        try{
          let {data} = await axios.get(`http://127.0.0.1:8000/api/user/profiles/${userID}`, {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          })
  
          console.log("dataaaaaaaaaaaaaaaaaaaaaaa", data)
          setUserData(data)
        }catch(error){
          console.error("Error adding category:", error);
        }      
      }
      getUserData()
    }, [])


    console.log(userData.is_admin)

    React.useEffect(()=>{
      dispatch(fetchCategory())
    },[])

  const handleAddCategory = async () => {
    try {
      
      await axios.post("http://127.0.0.1:8000/api/categories/", {
        title: "New Category", 
      });
     
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
const hadleItemClick=(catId)=>{
  dispatch(filterProducts(catId))
}
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        padding: "20px",
        backgroundColor: "#f5f5f5",
        height: "100%",
        marginBottom: "50px",
      }}
      role="presentation"
      onClick={hadelCloseSide}
    >
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories?.map((category) => (
          <ListItem key={category.category_id} disablePadding onClick={()=>{hadleItemClick(category.category_id)}}>
            <ListItemButton>
              <ListItemText primary={category.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ marginY: 2 }} />
      
      <Stack spacing={2} sx={{ margin: "10px 0" }}>

        {userToken?<>
          <Typography variant="h6" gutterBottom>
        Create
      </Typography>
          <TealButton
          variant="contained"
          color="success"
          onClick={() => {
            dispatch(categoryModalOpen());
          }}
        >
          New Category
        </TealButton>
        <TealButton
          variant="contained"
          onClick={() => {
            dispatch(productModalOpen());
          }}
        >
          New Product
        </TealButton>
        </>:""}
        
       
        {
          userData.is_admin ?<TealButton
          variant="contained"
          color="error"
          onClick={() => {
            dispatch(signModalOpen());
          }}
        >
          New Account
        </TealButton>:""
        }
        
      </Stack>

      
      <List>
      
        <ListItem>

     
      {userData.is_admin ?<Button   fullWidth variant="contained" color="inherit"  onClick={() => navigate("/allprofiles")}>
       
        All profiles
      </Button>:""}
      </ListItem>
        <ListItem>
          {userToken? <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>:""}
          
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer open={openSide} onClose={hadelCloseSide}>
      {DrawerList}
    </Drawer>
  );
}