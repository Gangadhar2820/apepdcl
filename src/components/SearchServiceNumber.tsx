import React, { useEffect, useState } from "react";
import { Consumer, getConsumerDataByServiceNo } from "../services/ServicenoService";

function SearchServiceNumber() {
  const [areacode, setAreacode] = useState("label");
  const [serviceno, setServiceno] = useState("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [consumer, setConsumer] = useState<Consumer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserPresent,setIsUserPresent] = useState(false);
  const [showNotFound,setShowNotFound] = useState(false);


  useEffect(() => {
   
  }, [isFormValid,consumer,isLoading,isUserPresent]);

  const validateForm =  () => {
    setIsFormValid(false);
    const isValid = areacode !== "label" && /^[0-9]{6}$/.test(serviceno);
    setIsFormValid(isValid);
    return isValid
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if(isValid){
      setIsLoading(true);
      setShowNotFound(false)
      setConsumer(null);
      setIsUserPresent(false);
      getConsumerDataByServiceNo(areacode.toUpperCase(),serviceno.toUpperCase()).then(res=>{
        setConsumer(res);
        setIsLoading(false);
        if(res?._ID){
          setIsUserPresent(true);
        }else{
          setIsUserPresent(false);
          setShowNotFound(true);
        }
      })

    }
  };

  return (
    <>
      <div className="container-fluid row">
        <div className="card">
          <div className="card-head ">
            <h5 className="card-title text-center p-3">
              Search consumer by service number
            </h5>
            <form action="" onSubmit={handleFormSubmit}>
              <div className="input-group ">
                <select
                  className={`form-select ${isFormValid ? "" : "is-invalid"}`}
                  value={areacode}
                  onChange={(e) => {
                    setAreacode(e.target.value.toString());
                  }}
                  aria-label="Default select example"
                >
                  <option value="label">Area code</option>
                  <option value="B232">B232 - Tootipala</option>
                  <option value="B239">B239 - Mamidipalem</option>
                  <option value="B255">B255 - Jangalapalem</option>
                  <option value="B260">B260 - Adigarlapalem</option>
                  <option value="B261">B261 - Pothaluru</option>
                </select>

                <input
                  type="text"
                  className={`form-control ${isFormValid ? "" : "is-invalid"}`}
                  value={serviceno}
                  onChange={(e) => {
                    setServiceno(e.target.value.toString());
                  }}
                  placeholder="Service no"
                  aria-label="Username"
                ></input>

                <button className="btn btn-primary" type="submit">
                  Show Details
                </button>
              </div>
            </form>
            {isFormValid ? "":<p className="text-center" style={{color:"red"}}>Invalid Area code or Service no</p>}
          </div>
          <div className="card-body text-center">

            { isLoading &&  <div className="spinner-grow text-info" style={{ width: "90px", height: "90px" }} role="status">
                <span role="status" style={{color: "white",position: "absolute",top: "30px",left: "12px",}}>
                  Loading...
                </span>
              </div> }
          
            {(isUserPresent && isFormValid) && (<table className="table table-primary table-borderless text-start table-striped caption-top">
              <caption className="text-center h5 p-1" style={{color:"blue"}}>{`115466${consumer?.AREA_CODE}${consumer?.SERVICE_NO}`}</caption>
                 <tbody>
                 <tr>
                     <td>
                       <b>Area Code</b>
                     </td>
                     <td>{consumer?.AREA_CODE}</td>
                   </tr>
                   <tr>
                     <th scope="row">Service No</th>
                     <td>{consumer?.SERVICE_NO}</td>
                   </tr>
                   <tr>
                     <th scope="row">Consumer Name</th>
                     <td>{consumer?.CONSUMER_NAME}</td>
                   </tr>
                   <tr>
                     <th scope="row">Nick Name</th>
                     <td>{consumer?.NICK_NAME}</td>
                   </tr>
                   <tr>
                     <th scope="row"> Parent Name</th>
                     <td>{consumer?.PARENT_NAME}</td>
                   </tr>
                   <tr>
                     <th scope="row">Current User</th>
                     <td>{consumer?.CURRENT_USER}</td>
                   </tr>
                   <tr>
                     <th scope="row">Phone No</th>
                     <td>{consumer?.PHONE_NO}</td>
                   </tr>
                   <tr>
                     <th scope="row">Location</th>
                     <td>{consumer?.LOCATION}</td>
                   </tr>
                 </tbody>
               </table>)}

               {(showNotFound && isFormValid) && "user doesn't exist"}
               
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchServiceNumber;
