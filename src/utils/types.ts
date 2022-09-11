import { Dispatch, SetStateAction } from "react";

export type languageType = {
  code: "string";
  name: "string";
};

export type languagesType = languageType[];

export type textareaPropsType = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  type: "inputField" | "outputField";
};
