import axios from "axios";
import type {LanguageContextType} from "@/contexts/languageselector";
export type SubmissionData = {
    code: string,
    language: LanguageContextType
}

export async function PostCode({code, language}: SubmissionData){
   const response =  await axios.post("http://localhost:3000/submission", {
        code:code,
        language:language
    })

    return response.data;
}
