import {Button} from "@/components/ui/button"
import {Languageselector} from "@/parts/languageselector";
export function Appbar(){
    return (
        <>
       <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"black", color:"white", minWidth:"100%", height:50}}>
       <div style={{fontFamily:"Roboto Condensed", fontSize:20, marginTop:10, marginLeft:13, cursor:'pointer', fontWeight:600}}>
       <Languageselector />
       </div>
       <div style={{fontFamily:"Roboto Condensed", fontSize:22, marginTop:10}}>
       ProgramEase
       </div>
       <div>
        <Button
        className="w-[60px] h-[40px] "
         style={{cursor:"pointer", fontFamily:"Roboto Condensed", fontSize:18, marginRight:10, marginTop:7}} variant="ghost">Run</Button>
       </div>
       </div>
        
        </>
    )
}
