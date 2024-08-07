import "./App.css";
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';         
import 'primeicons/primeicons.css';                       
import 'primeflex/primeflex.css';  
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddConsumer from "./components/AddConsumer";
import SearchAreaCode from "./components/SearchAreaCode";
import Error from "./components/Error";
import SearchServiceNumber from "./components/SearchServiceNumber";
import Home from "./components/Home";
import LogBook from "./components/LogBook";


function App() {
  return (
    <>
      <BrowserRouter basename="/apepdcl">
      <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addconsumer" element={<AddConsumer/>}/>
          <Route path="/searchserviceno" element={<SearchServiceNumber/>}/>
          <Route path="/searchareacode" element={<SearchAreaCode/>}/>
          <Route path="/logbook" element={<LogBook/>}/>
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
