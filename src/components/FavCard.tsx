import { useContext } from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { savedItemType } from "../utils/types";
import { LanguagesListContext } from "../context/context";

type removePropType = {
  remove: (favId: string) => void;
};

export const FavCard: React.FC<savedItemType & removePropType> = ({
  id,
  output,
  outputLang,
  input,
  inputLang,
  remove,
}) => {
  const { languages } = useContext(LanguagesListContext);
  const inputLangName = languages.find(({ code }) => code === inputLang)?.name;
  const outputLangName = languages.find(
    ({ code }) => code === outputLang
  )?.name;

  return (
    <Card
      sx={{
        width: { xs: "100%", md: "70%" },
        margin: "2rem auto",
        position: "relative",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, display: "flex", alignItems: "center", mb: 1.5 }}
          color="text.secondary"
        >
          <span>{inputLangName}</span>{" "}
          {<KeyboardDoubleArrowRightIcon fontSize="inherit" />}{" "}
          <span>{outputLangName}</span>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <span>{inputLangName}:</span> {input}
        </Typography>
        <Typography color="text.secondary">
          <span>{outputLangName}:</span> {output}
        </Typography>
      </CardContent>
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={() => remove(id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};
