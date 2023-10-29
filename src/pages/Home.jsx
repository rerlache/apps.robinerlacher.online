import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import LoginHistory from "../components/LoginHistory";

export default function Home() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div>Home</div>
      <p>Hier kommt dann die auflistung der anwendungen!</p>
      {auth && (
        <>
          <p>
            Welcome back, {auth.user.firstName} {auth.user.lastName}.
            {auth.user.userName}
          </p>
        </>
      )}
      <LoginHistory />
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
