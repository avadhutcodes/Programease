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
import {useState, useEffect} from "react";
import {Resultcontext} from "@/contexts/Resultprovider";
export function Appbar(){
    const {language} = useContext(LanguageContext);
    const {code} = useContext(Codecontext);
    const {setResult} = useContext(Resultcontext);
    const queryClient = useQueryClient();
    const [submissionid, setsubmissionid] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
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
      return false;
    }
 
  }
});

useEffect(() => {
  const data = query.data;

  if (!data) return;

  if (data.status === "processing") {
    setIsRunning(true);
  } else {
    setResult(data.result);
    setIsRunning(false);
  }
}, [query.data, setResult]);



    const mutation = useMutation({
    mutationFn: PostCode,
    
    onSuccess: (data) => {
      
       setsubmissionid(data.submissionid);
       queryClient.invalidateQueries({ queryKey: ['result', submissionid] });
    },
    onError: (error) => {
    console.error("Submission failed :", error);
    setIsRunning(false);
  },
  })
  const handleRun = () => {

    if (!code || code.trim() === "") {
        // Don't make backend request
        setResult("Please enter code.");
        return;
    }

    mutation.mutate({
        code,
        language
    });
};
    return (
        <>
       <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"black", color:"white", minWidth:"100%", height:50}}>
       <div style={{fontFamily:"Roboto Condensed", fontSize:20, marginTop:10, marginLeft:13, cursor:'pointer', fontWeight:600}}>
       <Languageselector />
       </div>
       <div style={{fontFamily:"Roboto Condensed", fontSize:22, marginTop:10}}>
       Program-Ease
       </div>
       <div style={{display:"flex", justifyContent:"space-between"}}>
        <div style={{marginTop:17, marginRight:22}}>
       <a
  href="https://x.com/Avadhut_Codes"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Follow me on X"
  className="mr-6"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
</a>
        </div>
        <div>
        <Button
        className="w-[60px] h-[40px] "
         style={{cursor:"pointer", fontFamily:"Roboto Condensed", fontSize:18, marginRight:10, marginTop:7}} variant="ghost" disabled={isRunning} onClick={handleRun
          }>{isRunning || mutation.isPending ? "Running..." : "Run"}</Button>
       </div>
       </div>
       
       </div>
        
        </>
    )
}
