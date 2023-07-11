import Post from "./Post";
import { Box } from "@mui/material";
import { post, user } from "./interface";
import { useQuery } from "@tanstack/react-query";

const Myposts = () => {
  const name: string = JSON.parse(localStorage.getItem("name") || "");
  let userId: number;
  const getData = async (): Promise<post[]> => {
    return await fetch("http://localhost:3200/postes").then((response) =>
      response.json()
    );
  };
  const { data: dataOfPost } = useQuery(["data"], getData);

  const getUserData = async (): Promise<user[]> => {
    return await fetch("http://localhost:3200/users").then((response) =>
      response.json()
    );
  };
  const { data: dataOfUsers } = useQuery(["usersData"], getUserData);

  dataOfUsers &&
    dataOfUsers.map((i) => {
      if (i.data.name === name) {
        userId = i.id;
        // setUserId(i.id);
      }
      return userId;
    });

  const filterByPost = (dataOfPost: { userId: number }) => {
    return dataOfPost.userId === userId;
  };
  const filterData = dataOfPost && dataOfPost.filter(filterByPost);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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

export default Myposts;
