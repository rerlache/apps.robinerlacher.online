import { TextField, Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";
import { userQuestions } from "../data/userQuestions";

export default function QuestionSelect() {
  return (
    <Controller
      as={
        <Autocomplete
          id="questionSelection"
          options={userQuestions}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Choose a question" />
          )}
        />
      }
      onchange={([event, data]) => data}
      name="question"
    />
  );
}
