import { createContext } from "react";

export type codetype = string;
export type Codecontexttype = {
    code : codetype,
    setcode : (code:codetype) => void
}
export const Codecontext = createContext<Codecontexttype>({
    code : "",
    setcode : (code) => {}
})


