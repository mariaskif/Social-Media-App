import React from "react";
import Post from "./Post";
import { Box } from "@mui/material";
import { post } from "./interface";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
const Home = () => {
  const getData = async (): Promise<post[]> => {
    return await fetch("http://localhost:3200/postes").then((response) =>
      response.json()
    );
  };
  const { data: dataOfPost } = useQuery(["data"], getData);
  console.log(dataOfPost);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {dataOfPost &&
        dataOfPost.map((item: post) => {
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
