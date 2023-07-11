import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { post } from "./interface";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const Update = () => {
  type info = {
    title: string | undefined;
    image: string | undefined;
    text: string | undefined;
  };
  const schema = yup.object().shape({
    title: yup.string(),
    image: yup.string(),
    text: yup.string(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const getData = async (): Promise<post[]> => {
    return await fetch("http://localhost:3200/postes").then((response) =>
      response.json()
    );
  };
  const { data: dataOfPost } = useQuery(["data"], getData);

  const filterByUpdate = (dataOfPost: { updated: boolean }) => {
    return dataOfPost.updated === true;
  };
  const filterData = dataOfPost && dataOfPost.filter(filterByUpdate);

  return (
    <Box>
      {filterData &&
        filterData.map((item: post) => {
          const updated = false;
          const onSubmit = async (data: info) => {
            const title = data.title;
            const image = data.image;
            const text = data.text;
            await fetch(`http://localhost:3200/postes/${item.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, image, text, updated }),
            });
            navigate("/home");
            console.log(title);
          };
          return (
            <Box
              key={item.id}
              sx={{ display: "flex", flexDirection: "column" }}
              maxWidth="400px"
              component="form"
              // onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                defaultValue={item.title}
                placeholder="Title.."
                multiline
                sx={{ mb: "10px" }}
                {...register("title")}
              />

              <TextField
                defaultValue={item.image}
                placeholder="image.."
                multiline
                sx={{ mb: "10px" }}
                {...register("image")}
              />

              <TextField
                defaultValue={item.text}
                placeholder="write what you think of .."
                multiline
                rows={10}
                {...register("text")}
              />

              <Stack sx={{ mt: "20px", display: "flex" }}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSubmit(onSubmit)}
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
