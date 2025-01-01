import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate, Link} from "react-router-dom";
import {  Button } from "@mui/material";


export default function Nav() {
    const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1,width:"100%",position:"fixed", zIndex:"100"}}>
      <AppBar position="static" sx={{ backgroundColor: "teal" }} >
        <Toolbar>
         
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
           <Link style={{color:"white", textDecoration:"none"}} to={"/"}>Smart Mall</Link>          
           </Typography>

        
      
         
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}