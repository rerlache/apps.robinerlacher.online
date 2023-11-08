import { useRef, useState, useEffect, useContext } from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  InputAdornment,
} from "@mui/material";
import {
  Send,
  InfoOutlined,
  AccountCircle,
  Password,
} from "@mui/icons-material";
import axios from "../api/axios";
import { auto } from "@popperjs/core";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const LOGIN_URL = "/general/Login/WithData";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const usernameRef = useRef();
  const errRef = useRef();
  //#region useStates
  const [userName, setUserName] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [staySignedIn, setStaySignedIn] = useState(
    localStorage.getItem("loggedIn")
  );

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
      const data = JSON.stringify({ userName, password });
      const response = await axios.post(LOGIN_URL, data);
      const accessToken = response.data.item1;
      const user = response.data.item2;
      setAuth({ accessToken, user });
      setFailureMsg("");
      setUserName("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setFailureMsg("No server response!");
      } else if (error.response?.status === 400) {
        setFailureMsg(error.response.data);
      } else {
        setFailureMsg("registration failed");
      }
      errRef.current.focus();
    }
  }

  return (
    // <Container>
    <Grid
      container
      sx={{
        height: "100vh",
        background:
          "linear-gradient(90deg, rgba(255,0,0,1) 30%, rgba(255,255,255,1) 60%)",
      }}
      columns={{ xs: 4, md: 12 }}
      direction="row"
    >
      <Box display="flex" justifyContent="center" xs={2} md={6} width="50%">
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h1">Welcome</Typography>
          {/* <Typography variant="body1">to</Typography> */}
          <Typography variant="subtitle1">Please login or register on the right.</Typography>
          <Typography variant="subtitle2">To access my applications.</Typography>
        </Stack>
      </Box>
      <Box
        xs={2}
        md={6}
        border={"1px solid black"}
        borderRadius={"25px"}
        padding={2}
        width="50%"
        maxWidth={500}
        margin={auto}
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
            <Box display="flex" alignItems="flex-end">
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="username"
                type="text"
                label="Username"
                variant="standard"
                placeholder="Enter username"
                autoComplete="off"
                fullWidth
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                ref={usernameRef}
                required
                aria-invalid={validUsername ? "false" : "true"}
                aria-describedby="usernamenote"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
            </Box>
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
            <Box display="flex" alignItems="flex-end">
              <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="standard"
                placeholder="Enter Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
            </Box>
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
              Allowed special characters: <span aria-label="dot">.</span>{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </Typography>
            {failureMsg && <p className="text-red-500">{failureMsg}</p>}
            <FormControlLabel
              control={<Checkbox checked={staySignedIn} />}
              label="Remember me?"
              disabled={true}
            />
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
            <Button
              onClick={() => {
                setAuth({});
                navigate("/reset");
              }}
            >
              reset
            </Button>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography>Need an account? </Typography>
            <Button
              onClick={() => {
                setAuth({});
                navigate("/register");
              }}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Box>
    </Grid>
    // </Container>
  );
}
