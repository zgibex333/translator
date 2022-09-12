import { axios } from "./axiosInstance";
import { GET_LANG_LIST, TRANSLATE_ROUTE } from "./constants";

export const getLanguagesQuery = async () => {
  const response = await axios.get(GET_LANG_LIST);
  return response.data.data.languages;
};

export const translateStringQuery = async (
  text: string = "мама",
  sourceLang: string = "auto",
  targetLang: string = "en"
) => {
  const response = await axios.post(
    TRANSLATE_ROUTE,
    new URLSearchParams({
      source_language: sourceLang,
      target_language: targetLang,
      text: text,
    })
  );
  if (response.data.status === "error") {
    throw new Error(response.data.message);
  }
  return response.data.data;
};
