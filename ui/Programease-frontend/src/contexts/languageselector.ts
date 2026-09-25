
import { createContext } from "react";

export type languagetype = string | null;

 export type LanguageContextType = {
  language: languagetype;
  setlanguage: (language:languagetype) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: null,
  setlanguage: () => {},
});