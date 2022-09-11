import { useContext } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { detectedLangType } from "../utils/types";
import { LanguagesListContext } from "../context/context";

export const DetectedLangSwitcher: React.FC<detectedLangType> = ({
  detectedLanguage,
  setColumnLanguage,
  setDetectedLanguage,
}) => {
  const { languages } = useContext(LanguagesListContext);

  if (detectedLanguage && detectedLanguage !== "fil" && setDetectedLanguage) {
    const switchLanguageHandler = () => {
      setColumnLanguage(detectedLanguage);
      setDetectedLanguage("");
    };
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="overline" display="block">
          Switch to{" "}
          {languages.find((lang) => lang.code === detectedLanguage)?.name}
        </Typography>
        <IconButton
          aria-label="switch"
          color="success"
          onClick={switchLanguageHandler}
        >
          <CheckCircleOutlineIcon />
        </IconButton>
      </Box>
    );
  }

  return <></>;
};
