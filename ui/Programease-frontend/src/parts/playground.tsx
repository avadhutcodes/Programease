
import { Editor } from "@monaco-editor/react";
import { Output } from "./output";

export function Playground() {
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
          defaultValue="// Happy coding!"
        />
      </div>

      
      <div
        style={{
          width: "100%",
          height: "30%",
        }}
      >
        <Output />
      </div>
    </div>
  );
}


































































































































































