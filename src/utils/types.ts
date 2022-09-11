import { Dispatch, SetStateAction } from "react";

type columnType = "inputField" | "outputField";

export type languageType = {
  code: "string";
  name: "string";
};

export type languagesType = languageType[];

export type columnPropsType = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  type: columnType;
  loading?: boolean;
  selectValue: string;
  setSelectValue: Dispatch<SetStateAction<string>>;
  detectedLang?: string;
  setDetectedLanguage?: Dispatch<SetStateAction<string>>;
};

export type textareaPropsType = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  type: columnType;
  loading?: boolean;
};

export type selectPropsType = {
  selectValue: string;
  setSelectValue: Dispatch<SetStateAction<string>>;
  type: columnType;
};

export type detectedLangType = {
  detectedLanguage: string | undefined;
  setColumnLanguage: Dispatch<SetStateAction<string>>;
  setDetectedLanguage: Dispatch<SetStateAction<string>> | undefined;
};
