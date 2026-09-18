import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Languageselector(){
     return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue  style={{paddingLeft:9, fontSize:16}}placeholder="Language" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="cpp" style={{fontSize:15, fontFamily:'Roboto Condensed', paddingLeft:13}}>C++</SelectItem>
        <SelectItem value="javascript" style={{fontSize:15, fontFamily:'Roboto Condensed', paddingLeft:13}}>JavaScript</SelectItem>
        <SelectItem value="python" style={{fontSize:15, fontFamily:'Roboto Condensed', paddingLeft:13}}>Python</SelectItem>
      </SelectContent>
    </Select>
  );
}
