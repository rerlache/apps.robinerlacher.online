import { useRef, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import {
  TextField,
  Autocomplete,
  Box,
  Button,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import { userQuestions } from "../data/userQuestions";
import { auto } from "@popperjs/core";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-Z][a-z-]{2,25}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;
const ANSWER_REGEX = /^[0-9a-zA-Z-\s]+[A-z0-9-]{1,50}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%]).{8,24}$/;
const REGISTER_URL = "/general/User/Register";

export default function Register() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const errRef = useRef();
  //#region useStates
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [userName, setUserName] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [eMail, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [question, setQuestion] = useState("");
  const [validQuestion, setValidQuestion] = useState(false);
  const [questionFocus, setQuestionFocus] = useState(false);

  const [answer, setAnswer] = useState("");
  const [validAnswer, setValidAnswer] = useState(false);
  const [answerFocus, setAnswerFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  //#endregion

  //#region useEffects
  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(userName));
  }, [userName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(eMail));
  }, [eMail]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPwd(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setValidQuestion(question !== "");
  }, [question]);

  useEffect(() => {
    setValidAnswer(ANSWER_REGEX.test(answer));
  }, [answer]);

  useEffect(() => {
    setErrMsg("");
  }, [
    firstName,
    lastName,
    userName,
    eMail,
    question,
    answer,
    password,
    matchPwd,
  ]);
  //#endregion

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = JSON.stringify({
        firstName,
        lastName,
        userName,
        eMail,
        password,
        question,
        answer,
      });
      await axios.post(REGISTER_URL, data);
      navigate("/login");
    } catch (error) {
      console.log("error.response", error.response);
      if (!error?.response) {
        setErrMsg("No server response!");
      } else if (error.response?.status === 400) {
        setErrMsg(error.response.data);
      } else {
        setErrMsg("registration failed");
      }
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
        <Box
          name="registerForm"
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Stack gap={2}>
            <Typography variant="h3">Register</Typography>
            <TextField
              id="firstname"
              type="text"
              ref={firstNameRef}
              label="Firstname"
              placeholder="Enter first name"
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              aria-invalid={validFirstName ? "false" : "true"}
              aria-describedby="firstnamenote"
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
            />
            <Typography
              id="firstnamenote"
              className={
                firstNameFocus && firstName && !validFirstName
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
              id="lastname"
              type="text"
              label="Lastname"
              placeholder="Enter last name"
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              aria-invalid={validLastName ? "false" : "true"}
              aria-describedby="lastnamenote"
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
            />
            <Typography
              id="lastnamenote"
              className={
                lastNameFocus && lastName && !validLastName
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
              id="username"
              type="text"
              label="Username"
              placeholder="Enter user name"
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
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
              id="email"
              type="text"
              label="Email"
              placeholder="Enter email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={eMail}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <Typography
              id="emailnote"
              className={
                emailFocus && eMail && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <InfoOutlined />
              Must be a valid email address.
            </Typography>
            <TextField
              id="password"
              type="password"
              label="Password"
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
              Allowed special characters: <span aria-label="dot">.</span>{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </Typography>
            <TextField
              id="confirmpassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
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
            <Autocomplete
              id="questionSelection"
              onSelect={(e) => setQuestion(e.target.value)}
              getOptionLabel={(option) => option.label}
              onChange={(option) => setQuestion(option.label)}
              options={userQuestions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="question"
                  type="text"
                  label="Security Question"
                  placeholder="Select a question"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  required
                  aria-invalid={validQuestion ? "false" : "true"}
                  aria-describedby="questionnote"
                  onFocus={() => setQuestionFocus(true)}
                  onBlur={() => setQuestionFocus(false)}
                />
              )}
            />
            <Typography
              id="questionnote"
              className={
                question && !validQuestion ? "instructions" : "offscreen"
              }
            >
              <InfoOutlined />
              Must select a security question.
            </Typography>
            <TextField
              id="answer"
              type="text"
              label="Answer"
              placeholder="Answer the selected question"
              autoComplete="off"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              required
              aria-invalid={validAnswer ? "false" : "true"}
              aria-describedby="answernote"
              onFocus={() => setAnswerFocus(true)}
              onBlur={() => setAnswerFocus(false)}
            />
            <Typography
              id="answernote"
              className={
                answerFocus && answer && !validAnswer
                  ? "instructions"
                  : "offscreen"
              }
            >
              <InfoOutlined />
              2 to 50 characters.
              <br />
              Letters, numbers, blanks, hyphens allowed.
              <br />A blank must be followed by a letter, number or hyphen.
            </Typography>
            <Typography
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </Typography>
            <Stack direction="row" justifyContent={"space-between"}>
              <Button
                onClick={() => {
                  setAuth({});
                  navigate("/login");
                }}
                startIcon={<ArrowCircleLeftOutlined />}
              >
                Back to login
              </Button>
              <Button
                disabled={
                  !validFirstName ||
                  !validLastName ||
                  !validUsername ||
                  !validEmail ||
                  !validPassword ||
                  !validMatchPwd ||
                  !validQuestion ||
                  !validAnswer
                }
                onClick={handleSubmit}
                endIcon={<ArrowCircleRightOutlined />}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
