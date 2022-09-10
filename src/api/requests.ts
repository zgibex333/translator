import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  timeout: 1000,
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "53a50289e7mshb74c59dcd59bc87p1ce9aajsn5c6baa27d192",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
});

type getTranslateArgsType = {
  sourceLang: string;
  targetLang: string;
  text: string;
};

const getTranslationResults = async ({
  sourceLang,
  targetLang,
  text,
}: getTranslateArgsType) => {
  try {
    const response = await axios.get("/translate", {
      params: {
        source_language: sourceLang,
        target_language: targetLang,
        text: text,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
