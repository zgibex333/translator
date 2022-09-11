import { Box } from "@mui/material";
import { columnPropsType } from "../utils/types";
import { SelectField } from "./SelectField";
import { TextArea } from "./TextArea";
import Skeleton from "@mui/material/Skeleton";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { DetectedLangSwitcher } from "./DetectedLangSwitcher";

export const TranslateColumn: React.FC<columnPropsType> = ({
  inputValue,
  setInputValue,
  type,
  loading,
  selectValue,
  setSelectValue,
  detectedLang,
  setDetectedLanguage,
}) => {
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
          <Box sx={{
            position: "absolute", 
            bottom: 0,
            right: 0
          }}>
            <IconButton aria-label="delete" size="large">
              <FavoriteBorderIcon fontSize="inherit" />
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
