import { Panel } from "primereact/panel";
import React from "react";

function Home() {
  return (
    <>
<Panel header={"Latest Updates"} className="m-3" toggleable>
  <ul>
    <li>Add consumer is working</li>
    <li>Maps are working</li>
    <li>Search Areacode is working</li>
    <li>Search Serviceno is working</li>
  </ul>
     
</Panel>

      
    </>
  );
}

export default Home;
