import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

export default function Input({
  label,
  type,
  id,
  placeholder,
  validation,
  name,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
      <TextField
        error={isInvalid}
        id={id}
        type={type}
        label={label}
        variant="filled"
        placeholder={placeholder}
        helperText={isInvalid && inputErrors.error.message}
        {...register(name, validation)}
      />
  );
}
