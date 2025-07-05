import './App.css'
import { BrowserRouter, Route} from "react-router-dom";
import { Suspense } from "react";
import Loading from "./utils/Loading";
import RoutesWhitNotFound from "./utils/RoutesWhitNotFound";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

function App() {

  return (
    <Suspense fallback={<Loading/>}> 
      <BrowserRouter>
        <RoutesWhitNotFound>
          <Route path="/" element={<TaskList/>}/>
          <Route path="/form" element={<TaskForm/>}/>
          <Route path="/item" element={<TaskItem/>}/>
        </RoutesWhitNotFound>
        
        {/* Mensaje */}
        {/* <Toaster position="bottom-right" richColors /> */}
      </BrowserRouter>
    </Suspense>
  )
}

export default App
