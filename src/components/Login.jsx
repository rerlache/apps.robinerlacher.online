import React, { useState } from "react";
import Button from "./button";
import Input from "./input";
import { useForm, FormProvider } from "react-hook-form";
import {username_validation, password_validation} from '../utils/inputFields'

export default function Login({ onFormSwitch }) {
  const methods = useForm();
  const [success, setSuccess] = useState(false)

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    methods.reset();
    setSuccess(true)
  });

  return (
    <div>
      <h2>Login</h2>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="off">
          <Input {...username_validation} />
          <Input {...password_validation} />
          {success && (
            <p>submit successful</p>
          )}
          <Button text="Login" OnClickFunc={onSubmit} />
        </form>
      </FormProvider>
      <Button text="Register" OnClickFunc={() => onFormSwitch("register")} />
    </div>
  );
}