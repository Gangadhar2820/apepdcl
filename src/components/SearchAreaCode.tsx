import React, { useState } from 'react'
import { Consumer } from '../services/ServicenoService';



function SearchAreaCode() {

  const [areacode,setAreacode] = useState("label");
  const [isFormValid,setIsFormValid] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const [consumers,setConsumers] = useState<Consumer[] | null>()

  const validateForm = ()=>{
    setIsFormValid(false);
    const isValid = areacode !== "label";
    setIsFormValid(isValid);
    return isValid
  }

  const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const isValid = validateForm();
    setIsFormValid(isValid);
    if(isValid){
      
      setIsLoading(true);
      setConsumers(null);
    }
  }

  return<>
  <div className="container-fluid row">
    <div className="card">
    <div className="card-head ">
            <h5 className="card-title text-center p-3">
              Area wise data
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


                <button className="btn btn-primary" type="submit">
                  Get Data
                </button>
              </div>
            </form>
            {isFormValid ? "":<p className="text-center" style={{color:"red"}}>Invalid Area code</p>}
          </div>

    </div>
  </div>
          
  </>


}

export default SearchAreaCode