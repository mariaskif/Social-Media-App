import React from 'react'
import Post from './Post'
import { featchProducts } from '../redux/userActions';
import { useEffect } from 'react';
import { useState } from 'react';
import {Box} from "@mui/material";
// import {useDispatch}  from "react-redux"
// import {useSelector} from "react-redux"
const Home = () => {

  // const postes=useSelector((state)=> state.reducer);
  // const dispatch=useDispatch();
  // useEffect(() => {
  //   dispatch(featchProducts());
  // }, []);

  const [mydata,setdata]=useState([]);
  const getdata =()=>{
    fetch("http://localhost:3200/postes").then((response)=>response.json()).then((data)=> setdata(data));
  }
  useEffect(() => {
    getdata();
  }
  ,[]);

  return (
    <div style={{display:'flex',
     flexWrap:"wrap",flexDirection:"column",
     alignItems:'center' }} md={2} lg={3}>   
   { mydata && mydata.map((item)=>{
      return( 
         <Box key={item.id}>
              <Post {...item}   />
         </Box>)
                 })} 
    </div>
  )
}

export default Home