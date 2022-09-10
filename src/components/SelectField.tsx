import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { languages } from "../utils/languages";

export const SelectField: React.FC = () => {
  const [lang, setLang] = useState("en");

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, mb: 2 }}>
      <FormControl fullWidth>
        <Select labelId="lag-select-label" value={lang} onChange={handleChange}>
          {Object.entries(languages).map(([longName, shortName]) => (
            <MenuItem key={shortName} value={shortName}>
              {longName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
