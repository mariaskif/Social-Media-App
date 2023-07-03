import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const User = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImg] = useState("");
  const [users, setUsers] = useState("");
 let updated=false;
  const fav = false;
  const numberOfLikes = 0;
  const name = JSON.parse(localStorage.getItem("name"));
  let userId = 0;

  const getData = () => {
    fetch("http://localhost:3200/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };
  useEffect(() => {
    getData();
  },[]);

  const filterUser = (users) => {
    return users.name === name ;
  };

  const filterData = users && users.filter(filterUser);

  filterData &&
  filterData.map((i) => {
      userId = i.id;
      return userId;
    });

  const sendPost = (e) => {
    fetch("http://localhost:3200/postes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        title,
        image,
        fav,
        numberOfLikes,
        updated,
        userId,
      }),
    }).then(navigate("/home"));
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "Wrap" }}
    >
      <Box>
        <img
          src="/images/avatar-01.jpg"
          style={{ height: "200px", width: "200px", borderRadius: "50%" }}
      alt="avatar"  />
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{ textAlign: "center", mt: "20px" }}
        >
          {name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }} component="form">
        <TextField
          onChange={(eo) => {
            setTitle(eo.target.value);
          }}
          placeholder="Title.."
          multiline
          sx={{ mb: "10px" }}
        />

        <TextField
          onChange={(eo) => {
            setImg(eo.target.value);
          }}
          placeholder="image.."
          multiline
          sx={{ mb: "10px" }}
        />

        <TextField
          onChange={(eo) => {
            setText(eo.target.value);
          }}
          placeholder="write what you think of .."
          multiline
          rows={10}
        />

        <Stack sx={{ mt: "20px", display: "flex" }}>
          <Button
            onClick={(params) => {
              sendPost(params);
            }}
            variant="contained"
            endIcon={<SendIcon />}
          >
            send
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          mt: "20px",
        }}
      >
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
            // localStorage.removeItem("pass");
            localStorage.removeItem("name");
            navigate("/");
          }}
          disableElevation
          sx={{ mb: "10px" }}
        >
          log Out
        </Button>
      </Box>
    </Box>
  );
};
export default User;
