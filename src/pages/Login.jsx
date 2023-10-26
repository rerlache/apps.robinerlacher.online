import { useRef, useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  TextField,
} from "@mui/material";
import { Send, InfoOutlined } from "@mui/icons-material";
import { username_validation, password_validation } from "../utils/inputFields";
import axios from "../api/axios";
import { auto } from "@popperjs/core";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const LOGIN_URL = "/general/Login/WithData";

export default function Login({ onFormSwitch }) {
  const usernameRef = useRef();
  //#region useStates
  const [userName, setUserName] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");
  //#endregion

  //#region useEffects
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  useEffect(() => {
    setValidUsername(USER_REGEX.test(userName));
  }, [userName]);
  useEffect(() => {
    setValidPassword(password !== "");
  }, [password]);
  //#endregion

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validUsername || !validPassword) {
      setFailureMsg("Enter a username and password!");
      return;
    }
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          userName: userName,
          password: password,
        },
      };
      const response = await axios.get(LOGIN_URL, axiosConfig);
      setSuccess(true);
      setSuccessMsg(
        response.data.item2.firstName + " " + response.data.item2.lastName
      );
      setFailureMsg("");
      setUserName("");
      setPassword("");
    } catch (error) {
      setSuccess(false);
      setSuccessMsg("");
      if (!error?.response) {
        setFailureMsg("No server response!");
      } else if (error.response?.status === 400) {
        setFailureMsg(error.response.data);
      } else {
        setFailureMsg("registration failed");
      }
    }
  }

  function logout() {
    setSuccess(false);
  }
  return (
    <Container>
      {success ? (
        <section>
          <h1>Welcome back</h1>
          <Typography>{successMsg}</Typography>
          <Button onClick={logout}>Logout</Button>
        </section>
      ) : (
        <Container>
          <Box
            border={"1px solid black"}
            borderRadius={"25px"}
            padding={2}
            maxWidth={500}
            marginLeft={auto}
            marginRight={auto}
          >
            <Box
              name="loginForm"
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <Stack gap={2}>
                <Typography variant="h3">Login</Typography>
                <TextField
                  id="username"
                  type="text"
                  label="Username"
                  variant="standard"
                  placeholder="Enter username"
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  ref={usernameRef}
                  required
                  aria-invalid={validUsername ? "false" : "true"}
                  aria-describedby="usernamenote"
                  onFocus={() => setUsernameFocus(true)}
                  onBlur={() => setUsernameFocus(false)}
                />
                <Typography
                  id="usernamenote"
                  className={
                    usernameFocus && userName && !validUsername
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <InfoOutlined />
                  4 to 24 characters.
                  <br />
                  Must begin with a capital letter.
                  <br />
                  Only letters allowed.
                </Typography>
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  variant="standard"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passwordnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <Typography
                  id="passwordnote"
                  className={
                    passwordFocus && password && !validPassword
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <InfoOutlined />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters: <span aria-label="dot">
                    .
                  </span>{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </Typography>
                {success && <p>{successMsg}</p>}
                {failureMsg && <p className="text-red-500">{failureMsg}</p>}
                <Button onClick={handleSubmit} endIcon={<Send />}>
                  Login
                </Button>
              </Stack>
            </Box>
            <Box
              maxWidth={500}
              marginLeft={auto}
              marginRight={auto}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Forgot password? </Typography>
                <Button onClick={() => onFormSwitch("reset")}>reset</Button>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Need an account? </Typography>
                <Button onClick={() => onFormSwitch("register")}>
                  Register
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      )}
    </Container>
  );
}
