import React from "react";
import { getdata } from "../redux/Actions";
import Post from "./Post";
import { featchProducts } from "../redux/Actions";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Myposts = () => {
  const [mydata, setdata] = useState([]);
  const [users, setUsers] = useState([]);
  // const [userI,setUsetI]=useState(0)
  const name = JSON.parse(localStorage.getItem("name"));
  const pass = JSON.parse(localStorage.getItem("pass"));
  let userId;
  const getdata = () => {
    fetch("http://localhost:3200/postes")
      .then((response) => response.json())
      .then((data) => setdata(data));
  };
  useEffect(() => {
    getdata();
  }, []);

  const getUserdata = () => {
    fetch("http://localhost:3200/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };
  useEffect(() => {
    getUserdata();
  });
  users.map((i) => {
    if (i.name === name && i.pass === pass) {
      userId = i.id;
    }
    return userId;
  });
  console.log(userId);

  const filterBYpost = (mydata) => {
    return mydata.userId === userId;
  };
  const filterdData = mydata.filter(filterBYpost);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
      }}
      md={2}
      lg={3}
    >
      {filterdData &&
        filterdData.map((item) => {
          return (
            <Box key={item.id}>
              <Post {...item} />
            </Box>
          );
        })}
    </div>
  );
};

export default Myposts;
