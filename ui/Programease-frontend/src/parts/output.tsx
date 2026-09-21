
export function Output(result:string) {
  return (
    <div
    style={{
          width: "100%",
          height: "45%",
        }}
    
    >
       <div style={{maxHeight:"100vh", minHeight:"100%", backgroundColor:"#373737", color:"white", fontFamily:"Roboto Condensed", fontSize:22}}>
    <div style={{marginLeft:5, marginTop:5}}>
        Output: {result}
    </div> 
    </div>
    </div>
    
  )
}
