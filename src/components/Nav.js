import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
// import pic from "../images/avatar-01.jpg"
const Nav = () => {
  const navigate=useNavigate();
  const intpass=localStorage.getItem("pass")
  const intname=localStorage.getItem("name")
  return (
    <Box sx={{ flexGrow: 1 ,mb:"40px"}}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={()=>{
            navigate("/")
          }}>
      <FacebookIcon/>
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FaceBook
        </Typography>

        <Button color="inherit" onClick={()=>{
  if (intpass !== "" && intname !== ""){
    navigate("/profile");
         }}}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
        my Profile
        </Typography>
        </Button>

      </Toolbar>
    </AppBar>
  </Box>
    
  )
}

export default Nav