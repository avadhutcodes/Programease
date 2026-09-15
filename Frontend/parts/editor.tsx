import * as monaco from 'monaco-editor';
import { Button } from "@/components/ui/button"
import {CollapsibleDemo} from "../tools/collapsible"
import {useState,useEffect} from "react"
import {Editor} from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {Upper} from "./upper"

export function Editorial(){
   
     return (
        <div>
            <div>
                <div style={{display:"flex", justifyContent:"space-between",backgroundColor:"white"}}>
                    <div style={{marginLeft:20, marginTop:9, marginBottom:5}}>
                       <Select>
                           <SelectTrigger style={{cursor:"pointer", width:197, backgroundColor:"white", color:"black", fontSize:18, fontWeight:700}}>
                              <SelectValue placeholder="Select language" />
                                    </SelectTrigger>

                                <SelectContent>
                                <SelectItem value="cpp" style={{fontWeight:700, cursor:"pointer"}}>C++</SelectItem>
                                <SelectItem value="javascript" style={{fontWeight:700, cursor:"pointer"}}>JavaScript</SelectItem>
                                <SelectItem value="python" style={{fontWeight:700, cursor:"pointer"}}>Python</SelectItem>
                                </SelectContent>
                                </Select>
                    </div>
                    <div>
                     <Button  variant={"outline"}style={{fontSize:20, cursor:"pointer", backgroundColor:"black", color:"white", marginTop:10, marginRight:10}}>Run</Button>
                    </div>
                </div>
            </div>
            <div style={{width:"100%", height:5, backgroundColor:"black"}}></div>

            <div>
           <Upper/>
            </div>
        </div>
    )
}
