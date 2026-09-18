import {Appbar} from "./parts/appbar";
import {Playground} from "@/parts/playground";
import Optionprovider from "@/contexts/provider";
function App() {

  return (
    <Optionprovider>
      <Appbar />
      <Playground />
    </Optionprovider>
  )
}
export default App
