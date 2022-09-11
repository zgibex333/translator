import { axios } from "./axiosInstance";
import { GET_LANG_LIST, TRANSLATE_ROUTE } from "./constants";

export const getLanguagesQuery = async () => {
  const response = await axios.get(GET_LANG_LIST);
  return response.data.data.languages;
};

// export const translateStringQuery = async (text: string) => {
//   try {
//     const response = await axios.post(TRANSLATE_ROUTE, {
//       params: {
//         ...defaultParams,
//         "to[0]": "en",
//         profanityAction: "NoAction",
//         textType: "plain",
//       },
//       data: JSON.stringify([{ Text: text }]),
//     });
//     console.log(response.data);
//   } catch (err) {}
// };
