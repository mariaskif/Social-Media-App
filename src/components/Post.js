import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
const Post = ({ title, text, image, id, fav, numberOfLikes, updated ,name }) => {
  const [dataOfCom, setDataOfCom] = useState([]);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const [showCom, setShowCom] = useState(false);
  const [textComm, setTextComm] = useState("");
  const [updateCom, setUpdateCom] = useState(false);
  const [upId, setUpId] = useState(0);

  // const name = JSON.parse(localStorage.getItem("name"));


  const changUpdates = () => {
    updated = true;
  };

  const getData = () => {
    fetch("http://localhost:3200/comments")
      .then((response) => response.json())
      .then((data) => setDataOfCom(data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card sx={{ margin: "10px", maxWidth: 340 }}>
      {/* start card header */}
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src="/images/avatar-01.jpg" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader="September 14, 2016"
      />
      {/* end card header */}

      {/* start card pictuer */}
      <CardMedia
        component="img"
        height="194"
        image={`/images/${image}`}
        alt="Paella dish"
      />
      {/*end card pictuer */}

      {/* start card content */}
      <CardContent>
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflowWrap: "break-word" }}
        >
          {text}
        </Typography>
      </CardContent>
      {/* end card content */}

      {/* start card actions */}
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          {/* favorites */}
          <IconButton
            aria-label="add to favorites"
            color={fav ? "error" : ""}
            onClick={() => {
              fav = !fav;
              fetch(`http://localhost:3200/postes/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ fav }),
              });
            }}
          >
            <FavoriteIcon />
          </IconButton>

          {/* Like */}
          <IconButton
            aria-label="Like"
            color={numberOfLikes > 0 ? "primary" : ""}
            onClick={(e) => {
   
              numberOfLikes = numberOfLikes + 1;
              fetch(`http://localhost:3200/postes/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ numberOfLikes }),
              });
            }}
          >
            <ThumbUpIcon />
            <div
              style={{
                position: "absolute",
                color: "black",
                width: "20px",
                height: "20px",
                bottom: 0,
                right: 0,
                transform: "translate(25%,25%)",
                zIndex: 1,
                fontSize: "15px",
              }}
            >
              {numberOfLikes}
            </div>
          </IconButton>

          {/* Comments */}
          <IconButton
            aria-label="comment"
            sx={{ mr: "10px" }}
            onClick={() => setClicked(!clicked)}
          >
            <CommentIcon />
            <div
              style={{
                position: "absolute",
                color: "black",
                width: "20px",
                height: "20px",
                bottom: 0,
                right: 0,
                transform: "translate(25%,25%)",
                zIndex: 1,
                fontSize: "15px",
              }}
            >
              {/* {numberOfComments} */}
            </div>
          </IconButton>
          {clicked === true ? (
            updateCom === false ? (
              <div>
                <TextField
                  size="small"
                  onChange={(e) => {
                    setTextComm(e.target.value);
                  }}
                  placeholder="comment.."
                  sx={{ mb: "10px", mr: "10px" }}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    setClicked(false);

                    const postId = id;

                    fetch(`http://localhost:3200/comments/`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ textComm, postId }),
                    }).then(navigate("/home"));
                  }}
                >
                  OK
                </Button>{" "}
              </div>
            ) : (
              <div>
                {dataOfCom.map((it) => {
                  return (
                    <Box>
                      {it.id === upId ? (
                        <Box>
                          <TextField
                            size="small"
                            defaultValue={it.textComm}
                            onChange={(e) => {
                              setTextComm(e.target.value);
                            }}
                            placeholder="comment.."
                            sx={{ mb: "10px", mr: "10px" }}
                          />
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setClicked(false);
                              fetch(`http://localhost:3200/comments/${it.id}`, {
                                method: "PATCH",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ textComm }),
                              }).then(navigate("/home"));
                            }}
                          >
                            OK
                          </Button>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  );
                })}
              </div>
            )
          ) : (
            ""
          )}
        </Box>
        <Box>
          {/* Update Post*/}
          <Button
            sx={{ mr: "10px", mt: "10px" }}
            variant="contained"
            onClick={() => {
              changUpdates();
              fetch(`http://localhost:3200/postes/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ updated }),
              }).then(navigate("/update"));
            }}
          >
            update
          </Button>

          {/* Delete Post */}
          <Button
            sx={{ mt: "10px" }}
            variant="contained"
            onClick={() => {
              fetch(`http://localhost:3200/postes/${id}`, {
                method: "DELETE",
              });
            }}
          >
            delete
          </Button>
        </Box>
      </CardActions>
      {/* end card actions */}

      {/* start comments section */}
      <Box sx={{ display: "flex", mb: "10px", justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={() => {
            setShowCom(!showCom);
          }}
        >
          Show Comments
        </Button>
      </Box>

      {showCom === true ? (
        <Box sx={{ mb: "10px" }}>
          {dataOfCom.map((i) => {
            return (
              <Box>
                {id === i.postId ? (
                  <Typography
                    key={i.id}
                    paragraph
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      ml: "10px",
                      mr: "10px",
                      border: "1px solid blue",
                      mb: "10px",
                      justifyContent: "space-between",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    {i.textComm}
                    <Box>
                      <IconButton
                        sx={{ padding: 0 }}
                        onClick={() => {
                          setUpdateCom(true);
                          setClicked(true);
                          setUpId(i.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ padding: 0 }}
                        color="error"
                        onClick={() => {
                          fetch(`http://localhost:3200/comments/${i.id}`, {
                            method: "DELETE",
                          });
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
            );
          })}
        </Box>
      ) : (
        ""
      )}
      {/* end comments section */}
    </Card>
  );
};

export default Post;
