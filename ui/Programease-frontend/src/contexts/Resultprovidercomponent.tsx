import {useState} from "react";
import type {Resulttype} from "@/contexts/Resultprovider";
import type {Resultcontexttype} from "@/contexts/Resultprovider";
import {Resultcontext} from "@/contexts/Resultprovider";
import type {ReactNode} from "react";

export default function Resultprovider({children}: {children:ReactNode}){
    const [Result, setResult] = useState<Resulttype>(null);
    return (
        <Resultcontext.Provider value = {{Result, setResult}}>
            {children}
        </Resultcontext.Provider>
    )
}
