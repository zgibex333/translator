import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    'X-RapidAPI-Key': '53a50289e7mshb74c59dcd59bc87p1ce9aajsn5c6baa27d192',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  },
});
