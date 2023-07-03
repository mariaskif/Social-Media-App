import React from "react";
import Post from "./Post";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";

const Myposts = () => {
  const [myData, setData] = useState([]);
  const [users, setUsers] = useState([]);
  // const [userI,setUsetI]=useState(0)
  const name = JSON.parse(localStorage.getItem("name"));
  // const pass = JSON.parse(localStorage.getItem("pass"));
  let userId;
  const getData = () => {
    fetch("http://localhost:3200/postes")
      .then((response) => response.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    getData();
  }, []);

  const getUserData = () => {
    fetch("http://localhost:3200/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };
  useEffect(() => {
    getUserData();
  });
  users.map((i) => {
    if (i.name === name) {
      userId = i.id;
    }
    return userId;
  });
  console.log(userId);

  const filterByPost = (myData) => {
    return myData.userId === userId;
  };
  const filterData = myData.filter(filterByPost);

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
      {filterData &&
        filterData.map((item) => {
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
