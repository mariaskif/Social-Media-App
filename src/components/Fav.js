import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";
const Fav = () => {
  const [myData, setData] = useState([]);
  const getData = () => {
    fetch("http://localhost:3200/postes")
      .then((response) => response.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    getData();
  }, []);
  const filterByFav = (myData) => {
    return myData.fav === true;
  };
  const filterData = myData.filter(filterByFav);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }} md={2} lg={3}>
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
export default Fav;
