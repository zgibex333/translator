import { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { textareaPropsType } from "../utils/types";

export const TextArea: React.FC<textareaPropsType> = ({
  type,
  inputValue,
  setInputValue,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value as string);
  };

  return (
    <TextField
      id="outlined-multiline-flexible"
      label={type === "inputField" ? "Type something" : "Your translation"}
      disabled={type === "outputField"}
      multiline
      rows={10}
      value={inputValue}
      onChange={(e) => handleChange(e)}
      sx={{
        width: "100%",
      }}
    />
  );
};
