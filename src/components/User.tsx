import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { user } from "./interface";
import { useQuery } from "@tanstack/react-query";
// import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
const User = () => {
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImg] = useState<string>("");
  const updated: boolean = false;
  const fav: boolean = false;
  const numberOfLikes: number = 0;
  const name: string = JSON.parse(localStorage.getItem("name") || "");
  let userId = 0;
  type info = {
    name: string;
    pass: string;
  };
  const getUserData = async (): Promise<user[]> => {
    return await fetch("http://localhost:3200/users").then((response) =>
      response.json()
    );
  };
  const { data: dataOfUsers } = useQuery(["usersData"], getUserData);

  const filterUser = (dataOfUsers: info) => {
    return dataOfUsers.name === name;
  };

  const filterData = dataOfUsers && dataOfUsers.filter(filterUser);

  filterData &&
    filterData.map((i) => {
      userId = i.id;
      return userId;
    });

  const sendPost = async () => {
    await fetch("http://localhost:3200/postes", {
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
        name,
      }),
    }).then(() => navigate("/home"));
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "Wrap" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <img
          src="/images/avatar-01.jpg"
          style={{ height: "200px", width: "200px", borderRadius: "50%" }}
          alt="avatar"
        />
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
            onClick={() => {
              sendPost();
            }}
            variant="contained"
            endIcon={<SendIcon />}
          >
            send
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default User;
