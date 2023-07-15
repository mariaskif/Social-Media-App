import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { Container } from "@mui/material";
import SignIn from "./components/Signin";
import Home from "./components/Home";
import User from "./components/User";
import Fav from "./components/Fav";
import Update from "./components/Update";
import Myposts from "./components/Myposts";

const App = () => {
  return (
    <>
      <Nav />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<User />} />
          <Route path="/favourite" element={<Fav />} />
          <Route path="/update" element={<Update />} />
          <Route path="/mypostes" element={<Myposts />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
