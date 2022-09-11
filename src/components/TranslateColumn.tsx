import { Box } from "@mui/material";
import { columnPropsType } from "../utils/types";
import { SelectField } from "./SelectField";
import { TextArea } from "./TextArea";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DetectedLangSwitcher } from "./DetectedLangSwitcher";
import { useEffect, useState } from "react";
import {
  addFavToStorageHandler,
  removePrevFavFromStorageHandler,
} from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";

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
        setSelectValue={setSelectValue}
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

      {loading && type === "outputField" && (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton />
          <Skeleton animation="wave" />
        </>
      )}
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
