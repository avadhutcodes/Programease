import {createContext} from "react";

export type Resulttype = string | null;
export type Resultcontexttype = {
    Result : Resulttype,
    setResult : (Result:Resulttype) => void
}
export const Resultcontext = createContext<Resultcontexttype> ({
    Result : null,
    setResult: (Result:Resulttype) => {}
})
