import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RepeatIcon from "@mui/icons-material/Repeat";
import { TranslateColumn } from "../components/TranslateColumn";

export const TranslatePage: React.FC = () => {
  return (
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
