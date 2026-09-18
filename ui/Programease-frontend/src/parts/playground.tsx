import { Editor } from "@monaco-editor/react";
import { Output } from "./output";
import {useContext} from "react";
import {LanguageContext} from "@/contexts/languageselector";
import {useState, useEffect} from "react";

export function Playground() {
  const {language} = useContext(LanguageContext);
  console.log(language);
  const [code, setcode] = useState<string>("");
  /*
  1. Send request to backend with code and language.
  2. get language option from language selector component via context api.
  3. till the code is processing show loading animation.
  4. once submission id is recieved poll the DB. 
  5. finally in our contextstore, store the value of the output or do prop passing for output component.
  */
  



  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "calc(100vh - 50px)",
      }}
    >
      
      <div
        style={{
         flex:1,
         minHeight:0,
        }}
      >
        <Editor
          height="100%"
          width="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => {
            setcode(value ?? "");
          }}
        />
      </div>

      
      <div
        style={{
          width: "100%",
          height: "45%",
        }}
      >
        <Output />
      </div>
    </div>
  );
}


































































































































































