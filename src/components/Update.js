import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
const Update = () => {
  const [mydata, setdata] = useState([]);
  const navigate = useNavigate();
  const getdata = () => {
    fetch("http://localhost:3200/postes")
      .then((response) => response.json())
      .then((data) => setdata(data));
  };
  useEffect(() => {
    getdata();
  }, []);

  const filterByUpdate = (mydata) => {
    return mydata.updated === true;
  };
  const filterdData = mydata.filter(filterByUpdate);

  return (
    <Box>
      {filterdData &&
        filterdData.map((item) => {
          let title = item.title;
          let imge = item.img;
          let text = item.text;
          let updated = item.updated;
          return (
            <Box
              key={item.id}
              sx={{ display: "flex", flexDirection: "column" }}
              maxWidth="400px"
              component="form"
            >
              <TextField
                defaultValue={item.title}
                onChange={(eo) => {
                  title = eo.target.value;
                }}
                placeholder="Title.."
                multiline
                sx={{ mb: "10px" }}
              />

              <TextField
                defaultValue={item.imge}
                onChange={(eo) => {
                  imge = eo.target.value;
                }}
                placeholder="image.."
                multiline
                sx={{ mb: "10px" }}
              />

              <TextField
                defaultValue={item.text}
                onChange={(eo) => {
                  text = eo.target.value;
                }}
                placeholder="write what you think of .."
                multiline
                rows={10}
              />

              <Stack sx={{ mt: "20px", display: "flex" }}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={() => {
                    updated = false;
                    fetch(`http://localhost:3200/postes/${item.id}`, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ title, imge, text, updated }),
                    }).then(navigate("/home"));
                  }}
                >
                  send
                </Button>
              </Stack>
            </Box>
          );
        })}
    </Box>
  );
};

export default Update;
