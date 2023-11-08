import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import {
  AccountCircle,
  Email,
  InfoOutlined,
  NavigateBefore,
  NavigateNext,
  Send,
} from "@mui/icons-material";
import { auto } from "@popperjs/core";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%]).{8,24}$/;

export default function Reset() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const errRef = useRef();
  //#region useStates
  const [userName, setUserName] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [eMail, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [stageOne, setStageOne] = useState(true);

  const [question, setQuestion] = useState("what's the question?");

  const [answer, setAnswer] = useState("");
  const [answerFocus, setAnswerFocus] = useState(false);

  const [stageTwo, setStageTwo] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [stageThree, setStageThree] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  //#endregion

  //#region useEffects
  useEffect(() => {
    if (auth.user != null) {
      setUserName(auth.user.userName);
    }
  }, []);
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPwd(password === matchPwd);
  }, [password, matchPwd]);
  //#endregion

  async function usernameAndEmailCheck() {
    const config = {
      headers: {
        username: userName,
        email: eMail,
      },
    };
    try {
      return await axios.get("/general/User/GetQuestionForUser", config);
    } catch (error) {
      setErrMsg(error.response.data);
      return error.response;
    }
  }

  async function checkAnswer() {
    const config = {
      headers: {
        username: userName,
        answer,
      },
    };
    try {
      return await axios.get("/general/User/CheckAnswer", config);
    } catch (error) {
      setErrMsg(error.response.data);
      return error;
    }
  }

  async function resetPassword() {
    const data = JSON.stringify({
      username: userName,
      email: eMail,
      answer,
      password,
    });
    try {
      return await axios.post("/general/User/ResetPassword", data);
    } catch (error) {
      setErrMsg(error.response.data);
      return error;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (errMsg) {
      setErrMsg("");
    }
    if (stageOne) {
      const question = await usernameAndEmailCheck();
      if (question.status == 200) {
        setQuestion(question.data);
        setStageOne(false);
        setStageTwo(true);
      }
    } else if (stageTwo) {
      const response = await checkAnswer();
      if (response.status == 200) {
        setStageTwo(false);
        setStageThree(true);
      } else {
        setAnswer("");
      }
    } else if (stageThree) {
      const pwResponse = await resetPassword();
      if (pwResponse.status == 200) {
        setPassword("");
        setMatchPwd("");
        setStageThree(false);
      }
    } else {
      navigate("/login");
    }
  }

  function handleBack() {
    if (stageOne) {
      navigate(-1);
    }
    if (stageTwo) {
      setStageTwo(false);
      setStageOne(true);
    }
    if (stageThree) {
      setStageThree(false);
      setStageTwo(true);
    }
  }
  return (
    <Grid
      container
      height="100vh"
      sx={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(255,0,0,1) 60%)",
      }}
      columns={{ xs: 4, md: 12 }}
      direction="row"
    >
      <Box
        border={"1px solid black"}
        borderRadius={"25px"}
        padding={2}
        maxWidth={500}
        margin={auto}
        xs={2}
        md={6}
        width="50%"
      >
        <Typography variant="h3">Reset Password</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Typography
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          marginBottom={2}
          aria-live="assertive"
        >
          {errMsg}
        </Typography>
        {!stageOne && !stageTwo && !stageThree && (
          <Stack name="done" gap={2} noValidate autoComplete="off">
            <Typography variant="subtitle1">Reset successfull!</Typography>
            <Button endIcon={<AccountCircle />} onClick={handleSubmit}>
              Back to login
            </Button>
          </Stack>
        )}
        {stageOne && (
          <Stack name="stageOneForm" gap={2} noValidate autoComplete="off">
            <Box display="flex" alignItems="flex-end">
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="username"
                type="text"
                label="Username"
                placeholder="Enter user name"
                autoComplete="off"
                variant="standard"
                fullWidth
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
            </Box>
            <Box display="flex" alignItems="flex-end">
              <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="email"
                type="email"
                label="Email"
                placeholder="Enter email"
                autoComplete="off"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                value={eMail}
                required
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </Box>
            <Button
              disabled={userName == "" || eMail == ""}
              endIcon={<NavigateNext />}
              onClick={handleSubmit}
            >
              Next
            </Button>
          </Stack>
        )}
        {stageTwo && (
          <Stack name="stageTwoForm" gap={2} noValidate autoComplete="off">
            <TextField label="Question" variant="standard" value={question} />
            <TextField
              id="answer"
              type="text"
              label="Answer"
              placeholder="Enter your answer"
              autoComplete="off"
              variant="standard"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              required
              onFocus={() => setAnswerFocus(true)}
              onBlur={() => setAnswerFocus(false)}
            />
            <Button
              disabled={answer == ""}
              endIcon={<NavigateNext />}
              onClick={handleSubmit}
            >
              Next
            </Button>
          </Stack>
        )}
        {stageThree && (
          <Stack name="stageThreeForm" gap={2} noValidate autoComplete="off">
            <TextField
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your new password"
              autoComplete="off"
              variant="standard"
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
              Allowed special characters: <span aria-label="dot">.</span>{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </Typography>
            <TextField
              id="matchpwd"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your new password"
              variant="standard"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatchPwd ? "false" : "true"}
              aria-describedby="matchpwdnote"
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
            />
            <Typography
              id="matchpwdnote"
              className={
                matchPwdFocus && matchPwd && !validMatchPwd
                  ? "instructions"
                  : "offscreen"
              }
            >
              <InfoOutlined />
              Must match the first password input field.
            </Typography>
            <Button
              disabled={!validPassword || !validMatchPwd}
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        )}
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Typography>Back to </Typography>
            <Button
              onClick={() => {
                setAuth({});
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Stack>
          <Button startIcon={<NavigateBefore />} onClick={handleBack}>
            Back
          </Button>
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin={auto}
        xs={2}
        md={6}
      >
        <Typography variant="subtitle1" align="center">
          In order to reset your password, first provide your username and
          password.
          <br />
          After that, you'll be prompted to answer the question from the
          registration.
          <br />
          When the answer is correct, you can set a new password.
        </Typography>
      </Box>
    </Grid>
  );
}
