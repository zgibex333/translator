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
