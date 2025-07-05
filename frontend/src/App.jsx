import './App.css'
import { BrowserRouter, Route} from "react-router-dom";
import { Suspense } from "react";
import Loading from "./utils/Loading";
import RoutesWhitNotFound from "./utils/RoutesWhitNotFound";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import { Toaster } from "sonner";

function App() {

  return (
    <Suspense fallback={<Loading/>}> 
      <BrowserRouter>
        <RoutesWhitNotFound>
          <Route path="/" element={<TaskList/>}/>
          <Route path="/task/:id" element={<TaskItem/>}/>
          <Route path="/create" element={<TaskForm/>}/>
          <Route path="/edit/:id" element={<TaskForm />} />
          
        </RoutesWhitNotFound>
        
        {/* Mensaje */}
        <Toaster richColors position="top-center" />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
