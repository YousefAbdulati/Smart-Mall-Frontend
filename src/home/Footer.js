import {
    Box,
    Typography,
  } from "@mui/material";
  import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer(){
    return(
        <Box sx={{bgcolor:"teal",py:1.3,width:"100%"}}>
            <Typography justifyContent={"center"} display={"flex"} alignItems={"center"} color={"HighlightText" } variant="h6" sx={{fontSize:18}}>
                Designed and developed by ©WebTeam

            </Typography>
            <Box justifyContent={"center"} display={"flex"} alignItems={"center"}>
            <TwitterIcon sx={{ fontSize: "16px", color: "#fff" }} />
        <FacebookIcon sx={{ fontSize: "16px", mx: 1, color: "#fff" }} />
        <InstagramIcon sx={{ fontSize: "16px", color: "#fff" }} />
            </Box>
        </Box>
    )
}

export default Footer;