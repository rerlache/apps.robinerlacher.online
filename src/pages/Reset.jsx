import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import { InfoOutlined, NavigateNext, Send } from "@mui/icons-material";
import { auto } from "@popperjs/core";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%]).{8,24}$/;

export default function Reset({ onFormSwitch }) {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const errRef = useRef();
  const questions = useState([""]);
  //#region useStates
  const [userName, setUserName] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [eMail, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [stageOne, setStageOne] = useState(true);

  const [question, setQuestion] = useState("what's the question?");

  const [answer, setAnswer] = useState("");
  const [answerDb, setAnswerDb] = useState("");
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
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPwd(password === matchPwd);
  }, [password, matchPwd]);
  //#endregion

  async function handleSubmit(e) {
    e.preventDefault();
    if (stageOne) {
      console.log("check in DB if username and email match");
      if (userName == "tuser" && eMail == "tuser@mail.com") {
        console.log("username and email are correct, got data for stage 2");
        setQuestion("How did you get here?");
        setAnswerDb("by clicking next");
        setStageOne(false);
        setStageTwo(true);
      } else {
        console.log("username and mail did not match!");
        setErrMsg("no login information found for this combination");
      }
    } else if (stageTwo) {
      console.log("validating the answer");
      if (answer === answerDb) {
        console.log("question answered correct, now update the password");
        setStageTwo(false);
        setStageThree(true);
      } else {
        console.log("answer not correct, retry");
        setAnswer("");
        setErrMsg("wrong answer, try again!");
      }
    } else if (stageThree) {
      if (password === matchPwd) {
        console.log(
          "password validated, updating the password for user: " + userName
        );
        setPassword("");
        setMatchPwd("");
        onFormSwitch("login");
      } else {
        setErrMsg("passwords don't match!");
      }
    } else {
      console.log("catching");
    }
    if (errMsg) {
      setErrMsg("");
    }
  }

  return (
    <Container>
      <Box
        border={"1px solid black"}
        borderRadius={"25px"}
        padding={2}
        maxWidth={500}
        marginLeft={auto}
        marginRight={auto}
      >
        <Typography variant="h3">Reset Password</Typography>
        <Typography variant="body2">
          In order to reset your password, first provide your username and
          password.
          <br />
          After that, you'll be prompted to answer the question from the
          registration.
          <br />
          When the answer is correct, you can set a new password.
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Typography
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          marginBottom={2}
          aria-live="assertive"
        >
          {errMsg}
        </Typography>
        {stageOne && (
          <Stack name="stageOneForm" gap={2} noValidate autoComplete="off">
            <TextField
              id="username"
              type="text"
              label="Username"
              placeholder="Enter user name"
              autoComplete="off"
              variant="standard"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              placeholder="Enter email"
              autoComplete="off"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
              value={eMail}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <Button endIcon={<NavigateNext />} onClick={handleSubmit}>
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
            <Button endIcon={<NavigateNext />} onClick={handleSubmit}>
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
    </Container>
  );
}
