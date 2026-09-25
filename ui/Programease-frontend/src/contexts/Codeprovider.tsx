import {useState} from "react";
import type {codetype} from "@/contexts/Codeccontextprovider";
import type {Codecontexttype} from "@/contexts/Codeccontextprovider";
import {Codecontext} from "@/contexts/Codeccontextprovider";
import type {ReactNode} from "react";
export  default function Codeprovider({children}: {children: ReactNode}) {
    const [code, setcode] = useState<codetype>(null);
    return (
     <Codecontext.Provider value = {{code,setcode,}}>
          {children}
     </Codecontext.Provider>
    
    )
}
