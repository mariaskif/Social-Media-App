import React from 'react'
import { Box } from '@mui/material'
import { useState } from 'react';
import { useEffect } from 'react';
import Post from './Post';
const Fav = () => {
    const [mydata,setdata]=useState([]); 
        const getdata =()=>{
 fetch("http://localhost:3200/postes").then((response)=>response.json()).then((data)=>setdata(data));
          }
          useEffect(() => {
            getdata();
          }
          ,[]);
   const filterBYfav=(mydata)=>{
   return mydata.fav === true       }
   const filterdData=mydata.filter(filterBYfav)
   console.log(filterdData);
   return (
    <div  style={{display:'flex', flexWrap:"wrap" }} md={2} lg={3}>   
    { filterdData && filterdData.map((item)=>{
          return( 
             <Box key={item.id}>
                  <Post {...item} />
             </Box>)
                               })}    
      </div>
  )
}
export default Fav