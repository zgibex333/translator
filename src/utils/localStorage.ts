import { savedItemType } from "./types";

export const addFavToStorageHandler = (
  id: string,
  output: string,
  outputLang: string,
  input: string,
  inputLang: string
) => {
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  const favItem = { id, output, outputLang, input, inputLang };
  if (!favourites.length) {
    localStorage.setItem("favourites", JSON.stringify([favItem]));
  } else {
    localStorage.setItem(
      "favourites",
      JSON.stringify([...favourites, favItem])
    );
  }
};

export const removePrevFavFromStorageHandler = () => {
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  if (favourites.length) {
    favourites.pop();
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};

export const getFavList = () => {
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  if (favourites.length) {
    return favourites;
  }
  return [];
};

export const saveFavsToStorage = (array: savedItemType[]) => {
  localStorage.setItem("favourites", JSON.stringify(array));
};

export const addItemToStorageHistory = (
  output: string,
  outputLang: string,
  input: string,
  inputLang: string
) => {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const historyItem = { output, outputLang, input, inputLang };
  if (!history.length) {
    localStorage.setItem("history", JSON.stringify([historyItem]));
  } else {
    const lastItem = history[history.length - 1];
    if (
      lastItem.output.toLowerCase() === output.toLowerCase() &&
      lastItem.input.toLowerCase() === input.toLowerCase()
    )
      return;
    localStorage.setItem("history", JSON.stringify([...history, historyItem]));
  }
};

export const getHistoryList = () => {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  if (history.length) {
    return history;
  }
  return [];
};
