import React from 'react'
import Post from './Post'
import { featchProducts } from '../redux/Actions';
import { useEffect } from 'react';
import { useState } from 'react';
import {Box} from "@mui/material";
import {useDispatch}  from "react-redux"
import {useSelector} from "react-redux"
import { getdata } from '../redux/Actions';
const Home = () => {

  const [mydata,setdata]=useState([]);
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getdata())
  }, [])
  const postes=useSelector((state)=> state.mydata);
  useEffect(() => {
    setdata(postes)
  }, [postes])
  
  
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