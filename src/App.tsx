import "./App.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddConsumer from "./components/AddConsumer";
// import SearchServiceNo from "./components/SearchServiceNo";
import SearchAreaCode from "./components/SearchAreaCode";
import Maps from "./components/Maps";
import Error from "./components/Error";
import SearchServiceNumber from "./components/SearchServiceNumber";

function App() {
  return (
    <>
      <BrowserRouter basename="/apepdcl">
      <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addconsumer" element={<AddConsumer/>}/>
          <Route path="/searchserviceno" element={<SearchServiceNumber/>}/>
          <Route path="/searchareacode/:areacode" element={<SearchAreaCode/>}/>
          <Route path="/maps" element={<Maps/>}/>
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
