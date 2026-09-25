import {Appbar} from "./parts/appbar";
import {Playground} from "@/parts/playground";
import Optionprovider from "@/contexts/provider";
import Codeprovider from "@/contexts/Codeprovider";
import Resultprovider from "@/contexts/Resultprovidercomponent";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
function App() {
  const queryClient = new QueryClient()

  return (
    <Resultprovider>
      <Codeprovider>
       <QueryClientProvider client={queryClient}>
    <Optionprovider>
      <Appbar />
      <Playground />
    </Optionprovider>
    </QueryClientProvider>
    </Codeprovider>
    </Resultprovider>
    
    
  )
}
export default App
