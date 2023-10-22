import React, { useState } from "react";
import axios from "axios";
import Button from "./button";
import Input from "./input";
import {
  firstname_validation,
  lastname_validation,
  username_validation,
  email_validation,
  password_validation,
  question_validation,
  answer_validation,
  confirm_password_validation,
} from "../utils/inputFields";
import { FormProvider, useForm } from "react-hook-form";

const API_URL = "https://localhost:44387/general/User/Register";

export default function Register({ onFormSwitch }) {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [regFailMsg, setRegFailMsg] = useState(true);

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
    const pwMatching = data.password == data.confirmPassword;
    setPasswordsMatch(pwMatching);
    if (!pwMatching) {
      setSuccess(false);
    }
    const regResponse = await registerAsync(data);
    console.log("regResponse", regResponse.data);
    if (regResponse.status == 200) {
      methods.reset();
      setSuccess(true);
      onFormSwitch("login");
    }
    setRegFailMsg(regResponse.data);
  });

  async function registerAsync(userData) {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        firstName: userData.firstname,
        lastName: userData.lastname,
        userName: userData.username,
        eMail: userData.email,
        password: userData.password,
        question: userData.question,
        answer: userData.answer,
      },
    };
    const response = await axios.post(API_URL, "", axiosConfig).catch(err => {setRegFailMsg(err); return err.response})
    console.log('response', response)
    return response
  }

  return (
    <div>
      <h2>Register</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <Input {...firstname_validation} />
          <Input {...lastname_validation} />
          <Input {...username_validation} />
          <Input {...email_validation} />
          <Input {...password_validation} />
          <Input {...confirm_password_validation} />
          <Input {...question_validation} />
          <Input {...answer_validation} />
          <br />
          {regFailMsg && <p className="text-red-500">{regFailMsg}</p>}
          {!passwordsMatch && (
            <p className="text-red-500">Passwords do not match</p>
          )}
          {success && <p>submit successful</p>}
          <Button text="Register" OnClickFunc={onSubmit} />
        </form>
      </FormProvider>
      <Button text="Back to login" OnClickFunc={() => onFormSwitch("login")} />
    </div>
  );
}
