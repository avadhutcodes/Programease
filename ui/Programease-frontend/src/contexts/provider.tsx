import {LanguageContext} from "@/contexts/languageselector";
import  type {languagetype} from "@/contexts/languageselector";
import type {LanguageContextType} from "@/contexts/languageselector";
import {createElement, useState, type ReactNode} from "react";

export default function Optionprovider({children}: {children: ReactNode}) {
     const [language, setlanguage] = useState<languagetype>(null);
     return (
       <LanguageContext.Provider value={{language,setlanguage,}}>
      {children}
     </LanguageContext.Provider>
     )
     
}
