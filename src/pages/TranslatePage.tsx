import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RepeatIcon from "@mui/icons-material/Repeat";
import { TranslateColumn } from "../components/TranslateColumn";
import { translateStringQuery } from "../api/requests";
import { LanguagesListContext } from "../context/context";
import { CircularProgress } from "@mui/material";

export const TranslatePage: React.FC = () => {
  const { loading } = useContext(LanguagesListContext);
  const [inputFieldValue, setInputFieldValue] = useState<string>("");
  const [outputFieldValue, setOutputFieldValue] = useState<string>("gdgfgdf");
  return loading ? (
    <Box sx={{ display: "grid", mt: 3, placeItems: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        mt: 10,
      }}
    >
      <TranslateColumn
        inputValue={inputFieldValue}
        setInputValue={setInputFieldValue}
        type={"inputField"}
      />
      <Button
        variant="outlined"
        onClick={() => translateStringQuery()}
        sx={{
          my: { xs: 2, md: "none" },
        }}
      >
        <RepeatIcon />
      </Button>
      <TranslateColumn
        inputValue={outputFieldValue}
        setInputValue={setOutputFieldValue}
        type={"outputField"}
      />
    </Box>
  );
};
