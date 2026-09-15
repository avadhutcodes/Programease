import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[35px] flex-col gap-2 "
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-xl font-semibold ">Language</h4>

        <CollapsibleTrigger asChild>
  <Button>
    <ChevronsUpDown />
  </Button>
</CollapsibleTrigger>

        </div>
      
        
      
      <CollapsibleContent>
        <div className="flex flex-col gap-2">
          <div style={{marginLeft:90}}>
            <Button style={{fontSize:17, cursor:"pointer"}}>Python</Button> 
          </div>
          <div style={{marginLeft:90}}>
            <Button style={{fontSize:17, cursor:"pointer"}}>JavaScript</Button>
          </div>
          <div style={{marginLeft:90}}>
            <Button style={{fontSize:17, cursor:"pointer"}}>Cpp</Button>
          </div>

        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

