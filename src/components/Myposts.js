// import React from 'react'
// import { getdata } from '../redux/Actions';
// import Post from './Post'
// import { featchProducts } from '../redux/Actions';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import {Box} from "@mui/material";
// import {useDispatch}  from "react-redux"
// import {useSelector} from "react-redux"
// const Myposts = () => {
//     const [mydata,setdata]=useState([]);
//     const [users,setUsers]=useState([]);
//     const [userI,setUsetI]=useState(0)
//     const name=JSON.parse(localStorage.getItem("name"))
//     const pass=JSON.parse(localStorage.getItem("pass"));
//     // let userId=0;
//     const getdata =()=>{
//       fetch("http://localhost:3200/postes").then((response)=>response.json()).then((data)=>setdata(data));
//                }
//                useEffect(() => {
//                  getdata();
//                }
//                ,[]);
    
//     const getUserdata =()=>{
//         fetch("http://localhost:3200/users").then((response)=>response.json()).then((data)=>setUsers(data));
//                  }
//                  useEffect(() => {
//                   getUserdata();
//                  })
  //   users.map((i)=>{
  //   if(i.name === name && i.pass===pass ) {
  //     setUsetI(userI)
  //   } 
  //  return userI
  //   })
    // console.log(userI);
    
    // console.log(userId)

    // const filterBYpost=(users)=>{
    //     return users.name === name && users.pass===pass    }
    //     const filterdData=users.filter(filterBYpost)

//     return (
//         <div style={{display:'flex',
//          flexWrap:"wrap",flexDirection:"column",
//          alignItems:'center' }} md={2} lg={3}>   
//        { mydata && mydata.map((item)=>{
    
    
//           return( 
//              <Box key={item.id}>
//                   <Post {...item}   />
//              </Box>)
//                      })} 
//         </div>
//       )
// }

// export default Myposts