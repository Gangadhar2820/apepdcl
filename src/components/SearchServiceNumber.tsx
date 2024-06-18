import React, { useEffect, useRef, useState } from "react";
import { Consumer, getConsumerDataByServiceNo, updateConsumer } from "../services/ServicenoService";
import {Toaster , toast} from "react-hot-toast";

function SearchServiceNumber() {
  const [areacode, setAreacode] = useState("label");
  const [serviceno, setServiceno] = useState("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [consumer, setConsumer] = useState<Consumer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserPresent,setIsUserPresent] = useState(false);
  const [showNotFound,setShowNotFound] = useState(false);
  const [isEditable,setIsEditable] = useState(false);
  const [isSaving,setIsSaving] = useState(false);



  useEffect(() => {

   
  }, [isFormValid,consumer,isLoading,isUserPresent,isSaving]);

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

  const handleFormSave = ()=>{
    setIsEditable(false);
    setIsSaving(true);
    updateConsumer(areacode,serviceno,consumer).then((data)=>{
        setIsSaving(false);
        if(data.status === 200){
        let toastAreaCode = data.data.AREA_CODE;
        let toastServiceNo = data.data.SERVICE_NO;
        let updatedCount = data.data.result.matchedCount;
        if(updatedCount===1){
          toast.success(`${toastAreaCode}${toastServiceNo} updated successfully`,{
            duration:2000,
            position:"top-center",
            style:{
              color:"green"
            }
            
          })
        }
        }
    })

  }

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
                  <option value="B202">B202 - Apandrapalem</option>
                  <option value="B205">B205 - Burugupalem</option>
                  <option value="B229">B229 - Tadapala</option>
                  <option value="B232">B232 - Tootipala</option>
                  <option value="B239">B239 - Mamidipalem</option>
                  <option value="B251">B251 - Tootipala</option>
                  <option value="B254">B254 - Ramarayudupalem</option>
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
              <caption className="text-center h5 p-2 text-primary" >115466<span className="text-danger">{consumer?.AREA_CODE}</span>{consumer?.SERVICE_NO}</caption>
                 <tbody>
                 <tr>
                    
                     <th scope="row">Area Code</th>
                     <td><input style={{width:"100%"}} className="form-control p-2" readOnly disabled type="text" value={consumer?.AREA_CODE}></input></td>
                   </tr>
                   <tr>
                     <th scope="row">Service No</th>
                     <td><input style={{width:"100%"}} className="form-control p-2" readOnly disabled type="text" value={consumer?.SERVICE_NO}></input></td>
                   </tr>
                   <tr>
                     <th scope="row">Consumer Name</th>
                     <td> <input style={{width:"100%"}} className="form-control p-2" readOnly={!isEditable} disabled={!isEditable}
                      type="text" value={consumer?.CONSUMER_NAME} 
                      onChange={(e)=>{setConsumer((prevConsumer)=>prevConsumer? {...prevConsumer , CONSUMER_NAME : e.target.value.toString()} :null)}}></input></td>
                   </tr>
                   <tr>
                     <th scope="row">Nick Name</th>
                     <td> <input style={{width:"100%"}} className="form-control p-2" readOnly={!isEditable} disabled={!isEditable}
                      type="text" value={consumer?.NICK_NAME} 
                      onChange={(e)=>{setConsumer((prevConsumer)=>prevConsumer? {...prevConsumer , NICK_NAME : e.target.value.toString()} :null)}}></input></td>
                   </tr>
                   <tr>
                     <th scope="row"> Parent Name</th>
                     <td> <input style={{width:"100%"}} className="form-control p-2" readOnly={!isEditable} disabled={!isEditable} 
                     type="text" value={consumer?.PARENT_NAME} 
                     onChange={(e)=>{setConsumer((prevConsumer)=>prevConsumer? {...prevConsumer , PARENT_NAME : e.target.value.toString()} :null)}}></input></td>

                   </tr>
                   <tr>
                     <th scope="row">Current User</th>
                     <td> <input style={{width:"100%"}} className="form-control p-2" readOnly={!isEditable} disabled={!isEditable}
                      type="text" value={consumer?.CURRENT_USER}
                      onChange={(e)=>{setConsumer((prevConsumer)=>prevConsumer? {...prevConsumer , CURRENT_USER : e.target.value.toString()} :null)}}></input></td>

                   </tr>
                   <tr>
                     <th scope="row">Phone No</th>
                     <td> <input style={{width:"100%"}} className="form-control p-2" readOnly={!isEditable} disabled={!isEditable} 
                     type="text" value={consumer?.MOBILE_NUMBER}
                    onChange={(e)=>{setConsumer((prevConsumer)=>prevConsumer? {...prevConsumer , MOBILE_NUMBER : e.target.value.toString()} :null)}}></input></td>
                   </tr>
                   <tr>
                     <th scope="row">Location</th>
                     <td> <input style={{width:"100%"}} className="form-control p-2" readOnly={!isEditable} disabled={!isEditable}
                      type="text" value={consumer?.LOCATION}
                      onChange={(e)=>{setConsumer((prevConsumer)=>prevConsumer? {...prevConsumer , LOCATION : e.target.value.toString()} :null)}}></input></td>
                   </tr>
                   <tr className="">
                    <td className="" colSpan={2}>
                      <div className="container-fluid d-flex justify-content-end">
                     {!isEditable? <>
                      <button type="button"  className="btn btn-primary" onClick={()=> setIsEditable(true)}><i className="bi bi-pencil-square"></i> Edit</button></>:
                      <button type="button" className="btn btn-success"
                      onClick={handleFormSave}><i className="bi bi-floppy-fill"></i> Save</button> }
                    </div></td>
                   </tr>
                 </tbody>
               </table>)}

               { isSaving &&  <div className="spinner-grow text-success" style={{ width: "90px", height: "90px",position:"absolute",top:"50%",left:"40%" }} role="status">
                <span role="status" style={{color: "white",position: "absolute",top: "30px",left: "20px",}}>
                  Saving...
                </span>
              </div> }

               {(showNotFound && isFormValid) && <p style={{color:"red"}}>Consumer doesn't exist with service no `{areacode}{serviceno}`</p>}

               
          </div>
        </div>
      </div>
      <Toaster/>

     
    </>
  );
}

export default SearchServiceNumber;
