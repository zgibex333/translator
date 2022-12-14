import { useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RepeatIcon from "@mui/icons-material/Repeat";
import { AlertColor, CircularProgress, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useDebounce } from "../hooks/useDebounceHook";
import { TranslateColumn } from "../components/TranslateColumn";
import { translateStringQuery } from "../api/requests";
import { LanguagesListContext } from "../context/context";
import { Alert } from "../components/Alert";
import { addItemToStorageHistory } from "../utils/localStorage";

type snackbarType = {
  message: string;
  status: AlertColor | undefined;
};

export const TranslatePage: React.FC = () => {
  const { loading, languages } = useContext(LanguagesListContext);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [snackbarData, setSnackbarData] = useState<snackbarType>({
    message: "",
    status: "info",
  });
  const [detectedLanguage, setDetectedLanguage] = useState<string>("");
  const [inputFieldValue, setInputFieldValue] = useState<string>("");
  const [outputFieldValue, setOutputFieldValue] = useState<string>("");
  const [processingTranslation, setProcessingTranslation] =
    useState<boolean>(false);
  const [currentLangInputField, setCurrentLangInputField] =
    useState<string>("auto");
  const [currentLangOutputField, setCurrentLangOutputField] =
    useState<string>("en");
  const [debouncedValue, setDebounceStopped] = useDebounce(
    inputFieldValue,
    1000
  );

  const translateOnChangeHandler = async () => {
    setProcessingTranslation(true);
    setDetectedLanguage("");
    try {
      const { translatedText, detectedSourceLanguage } =
        await translateStringQuery(
          inputFieldValue,
          currentLangInputField,
          currentLangOutputField
        );
      setOutputFieldValue(translatedText);
      if (detectedSourceLanguage?.code) setDetectedLanguage(detectedSourceLanguage.code);
      const currentLang = detectedSourceLanguage?.code || currentLangInputField;
      addItemToStorageHistory(
        translatedText,
        currentLangOutputField,
        inputFieldValue,
        currentLang
      );
    } catch (err) {
      setInputFieldValue("");
      const error = err as AxiosError | Error;
      setOpenAlert(true);
      setSnackbarData({
        message: error.message,
        status: "error",
      });
    }
    setProcessingTranslation(false);
    setDebounceStopped(false);
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const switchColumnsHandler = () => {
    const tempValue = currentLangInputField;
    setDebounceStopped(true);
    setInputFieldValue(outputFieldValue);
    if (currentLangInputField === "auto") {
      setCurrentLangInputField(currentLangOutputField);
      setCurrentLangOutputField(detectedLanguage || currentLangOutputField);
      return;
    } 
    if(currentLangInputField === currentLangOutputField) {
      translateOnChangeHandler()
      return;
    }
      setCurrentLangInputField(currentLangOutputField);
      setCurrentLangOutputField(tempValue);
  };

  useEffect(() => {
    if (isFirstRender) setIsFirstRender(false);
    if (!isFirstRender && inputFieldValue) translateOnChangeHandler();
    if (!inputFieldValue) setOutputFieldValue("");
  }, [debouncedValue]);

  useEffect(() => {
    if (isFirstRender) setIsFirstRender(false);
    if (!isFirstRender && inputFieldValue) translateOnChangeHandler();
    if (!inputFieldValue) setOutputFieldValue("");
  }, [currentLangInputField, currentLangOutputField]);

  return loading ? (
    <Box sx={{ display: "grid", mt: 3, placeItems: "center" }}>
      <CircularProgress />
    </Box>
  ) : languages.length ? (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          my: 10,
        }}
      >
        <TranslateColumn
          inputValue={inputFieldValue}
          setInputValue={setInputFieldValue}
          type={"inputField"}
          selectValue={currentLangInputField}
          setSelectValue={setCurrentLangInputField}
          detectedLang={detectedLanguage}
          setDetectedLanguage={setDetectedLanguage}
        />
        <Button
          variant="outlined"
          onClick={switchColumnsHandler}
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
          loading={processingTranslation}
          selectValue={currentLangOutputField}
          setSelectValue={setCurrentLangOutputField}
          fromLang={inputFieldValue}
          fromText={
            currentLangInputField === "auto"
              ? detectedLanguage
              : currentLangInputField
          }
        />
      </Box>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={snackbarData.status}
          sx={{ width: "100%" }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </>
  ) : (
    <Box
      sx={{
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Failed to load page
      </Typography>
    </Box>
  );
};
