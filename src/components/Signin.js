import React from 'react'
import {Box,Button,Typography,TextField} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const Signin = () => {
const [pass,setPass]=useState();
const[name,setName]=useState();
const navigate=useNavigate();


  return (
<Box >
<Typography variant="h3"  sx={{textAlign:"center",mt:"40px",}}>
Welcom To My App 
</Typography>

<Box style={{display:"flex",flexDirection:"column",
alignItems:"center",padding:"20px"}} component="form">

        <TextField
        sx={{width:"300px",mb:"20px"}}
        onChange={(e)=> {  setName(e.target.value);}}
          id="outlined-input"
          label="Name"
          autoComplete="current-password"
           required
        />

   <TextField
         sx={{width:"300px",mb:"20px"}}
      onChange={(e)=> { setPass(e.target.value);}}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
        />

{/* Signup */}
<Button variant="outlined"
 sx={{mt:"20px",width:"200px" }} 
 type='submit'  onClick={() => {
            if(pass !== undefined && name !== undefined){
              localStorage.setItem("pass",JSON.stringify(pass));
              localStorage.setItem("name",JSON.stringify(name));
                navigate("/home");
          }else{
            navigate("/");
          } }}>Signup</Button>
          
{/* Login */}
<Button variant="outlined" sx={{mt:"20px",width:"200px"}} type='submit'
 onClick={()=>{
 const intpass=localStorage.getItem("pass")
  const intname=localStorage.getItem("name")
  if (pass === intpass && name === intname){
    navigate("/home");
  }
  else{
<Alert severity="error">check out your password and Name !</Alert>
  }
}}>Login</Button>

   </Box>
</Box>
  )
}

export default Signin