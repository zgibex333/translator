import { useEffect, useState } from "react";
import { getLanguagesQuery } from "../api/requests";
import { LanguagesListContext } from "../context/context";
import { languagesType } from "../utils/types";

type Props = {
  children?: React.ReactNode;
};

export const LangContextWrapper: React.FC<Props> = ({ children }) => {
    const [languages, setLanguages] = useState<languagesType>([]);
    const [loading, setLoading] = useState<boolean>(false);

  const getLanguages = async () => {
    setLoading(true);
    try {
      const languages = await getLanguagesQuery();
      setLanguages(languages);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLanguages();
  }, []);


  return (
    <LanguagesListContext.Provider value={{languages, loading}}>
      {children}
    </LanguagesListContext.Provider>
  );
};
