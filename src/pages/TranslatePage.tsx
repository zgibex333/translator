import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RepeatIcon from "@mui/icons-material/Repeat";
import { TranslateColumn } from "../components/TranslateColumn";
import { translateStringQuery } from "../api/requests";
import { LanguagesListContext } from "../context/context";
import { AlertColor, CircularProgress } from "@mui/material";
import { useDebounce } from "../hooks/useDebounceHook";
import { Alert } from "../components/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AxiosError } from "axios";
import { addItemToStorageHistory } from "../utils/localStorage";

type snackbarType = {
  message: string;
  status: AlertColor | undefined;
};

export const TranslatePage: React.FC = () => {
  const { loading } = useContext(LanguagesListContext);
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
  const debouncedValue = useDebounce(inputFieldValue, 1000);

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
      if (detectedSourceLanguage) setDetectedLanguage(detectedSourceLanguage);
      const currentLang = detectedSourceLanguage || currentLangInputField;
      addItemToStorageHistory(
        translatedText,
        currentLangOutputField,
        inputFieldValue,
        currentLang
      );
    } catch (err) {
      const error = err as AxiosError | Error;
      setOpenAlert(true);
      setSnackbarData({
        message: error.message,
        status: "error",
      });
    }
    setProcessingTranslation(false);
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
    if (currentLangInputField === "auto") {
      setCurrentLangInputField(currentLangOutputField);
      setCurrentLangOutputField(detectedLanguage || currentLangOutputField);
    } else {
      setCurrentLangInputField(currentLangOutputField);
      setCurrentLangOutputField(tempValue);
    }
    setInputFieldValue(outputFieldValue);
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
  ) : (
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
  );
};
