import "./App.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddConsumer from "./components/AddConsumer";
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
          <Route path="/" element={<SearchServiceNumber/>}/>
          <Route path="/addconsumer" element={<AddConsumer/>}/>
          <Route path="/searchserviceno" element={<SearchServiceNumber/>}>
          </Route>
          <Route path="/searchareacode" element={<SearchAreaCode/>}/>
          <Route path="/maps" element={<Maps/>}/>
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
