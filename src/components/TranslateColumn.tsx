import { Box } from "@mui/material";
import { SelectField } from "./SelectField";
import { TextArea } from "./TextArea";

export const TranslateColumn: React.FC = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
      }}
    >
      <SelectField />
      <TextArea />
    </Box>
  );
};
