import { createContext } from "react";
import { languagesType } from "../utils/types";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const LanguagesListContext = createContext<{
  languages: languagesType;
  loading: boolean;
}>({
  languages: [],
  loading: false
});
