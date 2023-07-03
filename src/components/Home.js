import React from "react";
import Post from "./Post";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getData } from "../redux/Actions";
const Home = () => {
  const [myData, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const postes = useSelector((state) => state.myData);
  useEffect(() => {
    setData(postes);
  }, [postes]);

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
      {myData &&
        myData.map((item) => {
          return (
            <Box key={item.id}>
              <Post {...item} />
            </Box>
          );
        })}
    </div>
  );
};

export default Home;
