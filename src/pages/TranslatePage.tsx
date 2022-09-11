import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RepeatIcon from "@mui/icons-material/Repeat";
import { TranslateColumn } from "../components/TranslateColumn";
import { getLanguagesQuery } from "../api/requests";
import { LanguagesListContext } from "../context/context";
import { CircularProgress } from "@mui/material";

export const TranslatePage: React.FC = () => {
  const { loading } = useContext(LanguagesListContext);
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
      <TranslateColumn />
      <Button
        variant="outlined"
        onClick={() => getLanguagesQuery()}
        sx={{
          my: { xs: 2, md: "none" },
        }}
      >
        <RepeatIcon />
      </Button>
      <TranslateColumn />
    </Box>
  );
};
