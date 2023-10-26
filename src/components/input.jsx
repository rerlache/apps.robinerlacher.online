import TextField from "@mui/material/TextField";

export default function Input({ id, type, label, placeholder, ref }) {
  return (
    <TextField
      ref={ref}
      id={id}
      type={type}
      label={label}
      variant="standard"
      placeholder={placeholder}
      // helperText={isInvalid && inputErrors.error.message}
      // {...register(name, validation)}
    />
  );
}
