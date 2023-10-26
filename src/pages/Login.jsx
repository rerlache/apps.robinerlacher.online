import React, { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm, FormProvider } from "react-hook-form";
import { username_validation, password_validation } from "../utils/inputFields";
import axios from "axios";

const API_URL = "https://localhost:44387/general/Login/WithData";

export default function Login({ onFormSwitch }) {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");

  const onSubmit = methods.handleSubmit(async (data) => {
    setSuccess(false);
    setFailureMsg("");
    setSuccessMsg("");
    const loginResponse = await LoginAsync(data);
    if(loginResponse.status == 200){
      console.log('loginResponse', loginResponse.data.item2)
      setSuccessMsg("Welcome, " + loginResponse.data.item2.firstName)
      methods.reset();
      setSuccess(true);
      return;
    }
    setFailureMsg(loginResponse.data);
  });

  async function LoginAsync(userData) {
    console.log('userData', userData)
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        userName: userData.username,
        password: userData.password,
      },
    };
    console.log('axiosConfig', axiosConfig)
    const response = await axios.get(API_URL,axiosConfig).catch((err) => {
      return err.response;
    });
    console.log('response', response)
    return response;
  }

  return (
    <div>
      <h2>Login</h2>
      <FormProvider {...methods}>
        <Box
          component="form"
          name="loginForm"
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <Input {...username_validation} />
          <Input {...password_validation} />
          {success && <p>{successMsg}</p>}
          {failureMsg && <p className="text-red-500">{failureMsg}</p>}
          <Button text="Login" OnClickFunc={onSubmit} />
        </Box>
      </FormProvider>
      <Button text="Register" OnClickFunc={() => onFormSwitch("register")} />
    </div>
  );
}
