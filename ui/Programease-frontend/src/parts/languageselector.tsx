import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {LanguageContext} from "@/contexts/languageselector";

import {useContext} from "react";

export function Languageselector(){
 const {language, setlanguage} = useContext(LanguageContext);
     return ( 
         <div>
        <Select
      value={language}
      onValueChange={setlanguage}
      >
      <SelectTrigger className="w-[120px]">
        <SelectValue  style={{paddingLeft:9, fontSize:16}} placeholder="Language" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem  value="C++" style={{fontSize:15, fontFamily:'Roboto Condensed', paddingLeft:13}}>C++</SelectItem>
        <SelectItem  value="JavaScript" style={{fontSize:15, fontFamily:'Roboto Condensed', paddingLeft:13}}>JavaScript</SelectItem>
        <SelectItem  value="Python" style={{fontSize:15, fontFamily:'Roboto Condensed', paddingLeft:13}}>Python</SelectItem>
      </SelectContent>
    </Select>
  
      </div>
        
  );
}
