import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LanguagesListContext } from "../context/context";

export const SelectField: React.FC = () => {
  const [lang, setLang] = useState<string>("en");
  const { languages } = useContext(LanguagesListContext);

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, mb: 2 }}>
      <FormControl fullWidth>
        <Select labelId="lang-select-label" value={lang} onChange={handleChange}>
          {languages.map(({ code, name }) => (
            <MenuItem key={code} value={code}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
