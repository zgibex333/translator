import React, { useContext } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LanguagesListContext } from "../context/context";
import { selectPropsType } from "../utils/types";

export const SelectField: React.FC<selectPropsType> = React.memo(
  ({ selectValue, setSelectValue, type }) => {
    const { languages } = useContext(LanguagesListContext);
    const handleChange = (event: SelectChangeEvent) => {
      setSelectValue(event.target.value as string);
    };
    return (
      <Box sx={{ minWidth: 120, mb: 2 }}>
        <FormControl fullWidth>
          <Select
            labelId="lang-select-label"
            value={selectValue}
            onChange={handleChange}
          >
            {type === "inputField" && (
              <MenuItem value={"auto"}>Auto-Detect</MenuItem>
            )}
            {languages.map(({ code, name }) => (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
);
