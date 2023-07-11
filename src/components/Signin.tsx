import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
import { user } from "./interface";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const Signin = () => {
  const navigate = useNavigate();
  interface info {
    name: string;
    pass: string;
  }
  const schema = yup.object().shape({
    name: yup.string().required(),
    pass: yup.string().required().min(4).max(20),
  });
  const onSubmit = async (data: info) => {
    await fetch("http://localhost:3200/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    }).then(() => navigate("/home"));
    localStorage.setItem("name", JSON.stringify(data.name));
  };
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const getUserData = async (): Promise<user[]> => {
    return await fetch("http://localhost:3200/users").then((response) =>
      response.json()
    );
  };
  const { data: dataOfUsers } = useQuery(["usersData"], getUserData);
  console.log(dataOfUsers);

  const handelLogin = (data: info) => {
    dataOfUsers &&
      // eslint-disable-next-line array-callback-return
      dataOfUsers.map((i) => {
        if (data.name === i.data.name && data.pass === i.data.pass) {
          localStorage.setItem("name", JSON.stringify(data.name));
          navigate("/home");
        } else {
          return console.log(data.name, data.pass);
        }
      });
  };
  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: "center", mt: "40px" }}>
        Welcome To My App
      </Typography>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          sx={{ width: "300px", mb: "20px" }}
          id="outlined-input"
          label="Name"
          autoComplete="current-password"
          required
          {...register("name")}
        />

        <TextField
          sx={{ width: "300px", mb: "20px" }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          {...register("pass")}
        />

        {/* Signup */}
        <Button
          variant="outlined"
          sx={{ mt: "20px", width: "200px" }}
          type="submit"
        >
          Signup
        </Button>

        {/* Login */}
        <Button
          variant="outlined"
          sx={{ mt: "20px", width: "200px" }}
          onClick={handleSubmit(handelLogin)}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Signin;