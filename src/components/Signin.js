import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";

const Signin = () => {
  const [pass, setPass] = useState();
  const [name, setName] = useState();
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  const getData = () => {
    fetch("http://localhost:3200/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };
  useEffect(() => {
    getData();
  }, []);

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
      >
        <TextField
          sx={{ width: "300px", mb: "20px" }}
          onChange={(e) => {
            setName(e.target.value);
          }}
          id="outlined-input"
          label="Name"
          autoComplete="current-password"
          required
        />

        <TextField
          sx={{ width: "300px", mb: "20px" }}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
        />

        {/* Signup */}
        <Button
          variant="outlined"
          sx={{ mt: "20px", width: "200px" }}
          type="submit"
          onClick={() => {
            if (pass !== undefined && name !== undefined) {
              fetch("http://localhost:3200/users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ pass, name }),
              });
              // localStorage.setItem("pass", JSON.stringify(pass));
              localStorage.setItem("name", JSON.stringify(name));
              // localStorage.setItem("id",JSON.stringify((id)));

              navigate("/home");
            } else {
              navigate("/");
            }
          }}
        >
          Signup
        </Button>

        {/* Login */}
        <Button
          variant="outlined"
          sx={{ mt: "20px", width: "200px" }}
          type="submit"
          onClick={() => {
            // eslint-disable-next-line array-callback-return
            users.map((i) => {
              if (pass === i.pass && name === i.name) {
                // localStorage.setItem("pass", JSON.stringify(pass));
                localStorage.setItem("name", JSON.stringify(name));
                // localStorage.setItem("id", JSON.stringify(i.id));

                navigate("/home");
              } else {
                return (
                  <Alert severity="error">
                    check out your password and Name !
                  </Alert>
                );
              }
            });
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Signin;
