import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export default function Home() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <div>Home</div>
      <p>Hier kommt dann die auflistung der anwendungen!</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setAuth({});
          navigate("/login");
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setAuth({});
          navigate("/register");
        }}
      >
        Register
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/reset");
        }}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/admin");
        }}
      >
        Admin
      </Button>
    </>
  );
}
