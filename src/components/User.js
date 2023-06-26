import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { TextField,Box ,Typography} from '@mui/material';
// import pic from "/images/avatar-01.jpg"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
 const comment={
  com:""
 }
const User = () => {
    const navigate=useNavigate();
    const [text,setText]=useState("");
    const [title,settitle]=useState("");
    const [imge,setImg]=useState("");
    const[updated,setUpdat]=useState(false);
    
const fav=false;
const numberOfLikes=0;
const password=localStorage.getItem("pass")
const name=localStorage.getItem("name");

const userInfo={
  password:password,
  name:name
}

const sendPost=(e)=>{
  fetch("http://localhost:3200/postes",{method:"POST",headers:{
    'Content-Type':'application/json'
  },body:JSON.stringify({text,title,imge,userInfo,fav,numberOfLikes,updated,comment})}).then( navigate("/home"))

}

  return (
    <Box sx={{display:"flex", justifyContent:"space-evenly",flexWrap:"Wrap"}} > 

    <Box>
     <img src="/images/avatar-01.jpg" style={{height:"200px",width:"200px",borderRadius:"50%"}}/>
     <Typography variant="h4"
     color="text.secondary" sx={{textAlign:"center",mt:"20px"}} >
       {name}
 </Typography>
    </Box>

<Box sx={{display:"flex",flexDirection:"column"}} component="form">

<TextField
   onChange={(eo) => {
    settitle(eo.target.value);
  }}
  placeholder="Title.."
  multiline
 sx={{mb:"10px"}}
/>

<TextField
   onChange={(eo) => {
    setImg(eo.target.value);
  }}
  placeholder="image.."
  multiline
 sx={{mb:"10px"}}
/>

 <TextField
   onChange={(eo) => {
    setText(eo.target.value);
  }}
  placeholder="write what you think of .."
  multiline
  rows={10}
/>

<Stack  sx={{mt:"20px",display:'flex'}}>
<Button onClick={(params) => {sendPost(params);}} variant="contained" endIcon={<SendIcon />}>send</Button>
</Stack>
 </Box>

     <Box sx={{display:"flex",flexDirection:"column",
     justifyContent:"space-evenly", mt:"20px"}}>
{/* Favourit Postes */}
     <Button  variant="contained" disableElevation sx={{mb:"10px"}}
      onClick={()=>{
      navigate("/favourite")
      }}>
     My Favourit Postes
    </Button>

{/* Logout */}
<Button variant="contained" color='error' onClick={()=>{
   localStorage.removeItem("pass");
   localStorage.removeItem("name");
   navigate("/");
}} disableElevation sx={{mb:"10px"}}>
   log Out  
 </Button>
 </Box>
      </Box>
  );
};
export default User