import {Button} from "@/components/ui/button"
import {Languageselector} from "@/parts/languageselector";
import {
  useQueryClient ,
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {useContext} from "react";
import {LanguageContext} from "@/contexts/languageselector";
import {PostCode} from "@/api/postapi";
import {GetStatus} from "@/api/getapi";
import {Codecontext} from "@/contexts/Codeccontextprovider";
import {useState} from "react";

export function Appbar(){
    const language = useContext(LanguageContext);
    const {code} = useContext(Codecontext);
    const queryClient = useQueryClient();
    const [submissionid, setsubmissionid] = useState<string | null>(null)
    const query = useQuery({
  queryKey: ["result", submissionid],

  queryFn: () => GetStatus(submissionid!),

  enabled: !!submissionid,

  refetchInterval: (query) => {
    const status = query.state.data?.status;

    if (status === "processing") {
      return 2000;
    }

    else {
      
    }

    
  }
});

    const mutation = useMutation({
    mutationFn: PostCode,
    onSuccess: (data) => {
      setsubmissionid(data.submissionid);
      queryClient.invalidateQueries({ queryKey: ['result', submissionid] });
    },
  })



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
         style={{cursor:"pointer", fontFamily:"Roboto Condensed", fontSize:18, marginRight:10, marginTop:7}} variant="ghost" onClick={()=> {
         mutation.mutate({
          code,
          language
         })
         }}>Run</Button>
       </div>
       </div>
        
        </>
    )
}
