import type {Resulttype} from "@/contexts/Resultprovider";
export function Output({result}: {result:Resulttype}) {
  return (
    
       <div style={{maxHeight:"100vh", minHeight:"100%", backgroundColor:"#373737", color:"white"}}>
    <div style={{marginLeft:5, marginTop:5, whiteSpace: "pre-wrap"}}>
      <div style={{fontFamily:"Roboto Condensed", fontSize:22}}>
        <p> Output : </p>
      </div>
       <div style={{fontFamily:"Roboto Condensed", fontSize:18}}>
         { result ?? " "}
       </div>
       
    </div> 
    </div>
    
    
  )
}
