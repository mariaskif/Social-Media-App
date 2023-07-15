import Post from "./Post";
import { Box, Button, Typography } from "@mui/material";
import { post } from "./interface";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const getData = async (): Promise<post[]> => {
    return await fetch("http://localhost:3200/postes").then((response) =>
      response.json()
    );
  };
  const { data: dataOfPost } = useQuery(["data"], getData);
  console.log(dataOfPost);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          mt: "20px",
          maxHeight: "300px",
          backgroundColor: "#eee",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          sx={{ mb: "10px" }}
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            add post
          </Typography>
        </Button>
        {/* Favorite Posts */}
        <Button
          variant="contained"
          disableElevation
          sx={{ mb: "10px" }}
          onClick={() => {
            navigate("/favourite");
          }}
        >
          My Favorite Posts
        </Button>
        <Button
          variant="contained"
          disableElevation
          sx={{ mb: "10px" }}
          onClick={() => {
            navigate("/mypostes");
          }}
        >
          My Posts
        </Button>
        {/* Logout */}
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.removeItem("name");
            navigate("/");
          }}
          disableElevation
          sx={{ mb: "10px" }}
        >
          log Out
        </Button>
      </Box>
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
    </Box>
  );
};

export default Home;
