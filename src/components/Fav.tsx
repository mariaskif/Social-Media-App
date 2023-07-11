import React from "react";
import { Box } from "@mui/material";
import Post from "./Post";
import { post } from "./interface";
import { useQuery } from "@tanstack/react-query";

const Fav = () => {
  const getData = async (): Promise<post[]> => {
    return await fetch("http://localhost:3200/postes").then((response) =>
      response.json()
    );
  };

  const { data: dataOfPost } = useQuery(["data"], getData);
  const filterByFav = (dataOfPost: { fav: boolean }) => {
    return dataOfPost.fav === true;
  };

  const filterData = dataOfPost && dataOfPost.filter(filterByFav);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
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
