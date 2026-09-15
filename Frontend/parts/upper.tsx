import Editor from "@monaco-editor/react";
import {useState, useEffect} from "react";

export function Upper(){
    const [code, setCode] = useState("");

  return (
    <Editor
      height="500px"
      defaultLanguage="cpp"
      defaultValue="// Write your code here"
      onChange={(value) => setCode(value || "")}
    />
  );


}
