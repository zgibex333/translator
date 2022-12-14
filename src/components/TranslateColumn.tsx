import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DetectedLangSwitcher } from "./DetectedLangSwitcher";
import {
  addFavToStorageHandler,
  removePrevFavFromStorageHandler,
} from "../utils/localStorage";
import { TextArea } from "./TextArea";
import { SelectField } from "./SelectField";
import { SkeletonProgress } from "./Skeleton";
import { columnPropsType } from "../utils/types";

export const TranslateColumn: React.FC<columnPropsType> = ({
  inputValue,
  setInputValue,
  type,
  loading,
  selectValue,
  setSelectValue,
  detectedLang,
  setDetectedLanguage,
  fromLang,
  fromText,
}) => {
  const [isMarkedFav, setIsMarkedFav] = useState<boolean>(false);
  const changeSelectValue = useCallback(setSelectValue, [setSelectValue]);
  
  const addToFavouritesHandler = () => {
    if (fromLang && fromText)
      setIsMarkedFav((prev) => {
        if (prev) {
          removePrevFavFromStorageHandler();
        } else {
          const id = uuidv4();
          addFavToStorageHandler(
            id,
            inputValue,
            selectValue,
            fromLang,
            fromText
          );
        }
        return !prev;
      });
  };

  useEffect(() => {
    setIsMarkedFav(false);
  }, [inputValue]);

 

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        position: "relative",
      }}
    >
      <SelectField
        selectValue={selectValue}
        setSelectValue={changeSelectValue}
        type={type}
      />
      {!loading && type === "outputField" && (
        <>
          <TextArea
            inputValue={inputValue}
            setInputValue={setInputValue}
            type={type}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <IconButton
              aria-label="delete"
              size="large"
              onClick={addToFavouritesHandler}
              disabled={!inputValue}
            >
              {!isMarkedFav && <FavoriteBorderIcon fontSize="inherit" />}
              {isMarkedFav && <FavoriteIcon fontSize="inherit" />}
            </IconButton>
          </Box>
        </>
      )}

      {loading && type === "outputField" && <SkeletonProgress />}
      {type === "inputField" && (
        <>
          <TextArea
            inputValue={inputValue}
            setInputValue={setInputValue}
            type={type}
          />
          <DetectedLangSwitcher
            detectedLanguage={detectedLang}
            setColumnLanguage={setSelectValue}
            setDetectedLanguage={setDetectedLanguage}
          />
        </>
      )}
    </Box>
  );
};
