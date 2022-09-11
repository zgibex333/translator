import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY as string,
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
});
