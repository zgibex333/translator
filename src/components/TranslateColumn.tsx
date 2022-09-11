import { Box } from "@mui/material";
import { textareaPropsType } from "../utils/types";
import { SelectField } from "./SelectField";
import { TextArea } from "./TextArea";

export const TranslateColumn: React.FC<textareaPropsType> = ({
  inputValue,
  setInputValue,
  type,
}) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
      }}
    >
      <SelectField />
      <TextArea
        inputValue={inputValue}
        setInputValue={setInputValue}
        type={type}
      />
    </Box>
  );
};
