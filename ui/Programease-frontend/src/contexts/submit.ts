import {createContext} from "react";

type codetype = string | null;

export type SubmitContext = {
    code:codetype,
    setcode:(code:codetype) => void,
    submit:()=>void
}

export const SubmitContext = createContext<SubmitContext>({
    code:"",
    setcode: () => {},
    submit: () => {},
})
