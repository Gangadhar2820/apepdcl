import React, { useEffect, useState } from "react";
import { addConsumer, Consumer } from "../services/ServicenoService";
import toast, { Toaster } from "react-hot-toast";

function AddConsumer() {
  const [areacode, setAreacode] = useState("label");
  const [serviceno, setServiceno] = useState("");
  const [consumername, setConsumername] = useState("");
  const [nickname, setNickname] = useState("");
  const [parentname, setParentname] = useState("");
  const [currentuser, setCurrentuser] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [location, setLocation] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const [isAreaCodeValid, setIsAreaCodeValid] = useState(false);
  const [isServiceNoValid, setIsServiceNoValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [areacode, serviceno]);

  const validateForm = () => {
    setIsAreaCodeValid(false);
    setIsServiceNoValid(false);
    const isAreaValid = areacode !== "label";
    const isServiceValid = /^[0-9]{6}$/.test(serviceno);
    setIsAreaCodeValid(isAreaValid);
    setIsServiceNoValid(isServiceValid);
    const isValid = isAreaValid && isServiceValid;

    return isValid;
  };

  const handleAddConsumer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setIsAdding(true);
      addConsumer(areacode, {
        AREA_CODE: areacode,
        SERVICE_NO: serviceno,
        CONSUMER_NAME: consumername,
        NICK_NAME: nickname,
        PARENT_NAME: parentname,
        CURRENT_USER: currentuser,
        LOCATION: location,
        MOBILE_NUMBER: mobilenumber,
      }).then((data) => {
        setIsAdding(false);
        if(data.data.addStatus){
          toast.success(`${data.data.areacode}${data.data.serviceno} ${data.data.message}`,{
            duration:2000,
            position:"top-center",
            style:{
              color:"green"
            }
            
          })

        }else{

          toast.error(`${data.data.areacode}${data.data.serviceno} ${data.data.message}`,{
            duration:2000,
            position:"top-center",
            style:{
              color:"red"
            }
   
          })

        }
      });
    } else {
      window.alert("Invalid Consumer Data");
    }
  };

  return (
    <>
      <div className="card">
        {isAdding && (
          <div
            className="spinner-grow text-success"
            style={{
              width: "90px",
              height: "90px",
              position: "absolute",
              left: "40%",
              top:"40%"
            }}
            role="status"
          >
            <span
              role="status"
              style={{
                color: "white",
                position: "absolute",
                top: "30px",
                left: "12px",
              }}
            >
              Adding...
            </span>
          </div>
        )}

        <form method="post" onSubmit={handleAddConsumer}>
          <table className="table table-primary table-borderless text-start table-striped caption-top">
            <caption className="text-center h5 p-2 text-primary">
              Add Consumer
            </caption>
            <tbody>
              <tr>
                <th scope="row">Area Code</th>
                <td>
                  <select
                    className={`form-select ${
                      isAreaCodeValid ? "is-valid" : "is-invalid"
                    }`}
                    value={areacode}
                    onChange={(e) => {
                      setAreacode(e.target.value.toString());
                    }}
                  >
                    <option value="label">Area code</option>
                    <option value="B202">B202 - Apandrapalem</option>
                    <option value="B205">B205 - Burugupalem</option>
                    <option value="B229">B229 - Tadapala</option>
                    <option value="B232">B232 - Tootipala</option>
                    <option value="B239">B239 - Mamidipalem</option>
                    <option value="B251">B251 - K Tadapala</option>
                    <option value="B254">B254 - Ramarayudupalem</option>
                    <option value="B255">B255 - Jangalapalem</option>
                    <option value="B260">B260 - Adigarlapalem</option>
                    <option value="B261">B261 - Pothaluru</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Service No</th>
                <td>
                  <input
                    style={{ width: "100%" }}
                    className={`form-control p-2 ${
                      isServiceNoValid ? "is-valid" : "is-invalid"
                    }`}
                    type="text"
                    value={serviceno}
                    onChange={(e) => {
                      setServiceno(e.target.value.toUpperCase());
                    }}
                    required
                  ></input>
                </td>
              </tr>

              <tr>
                <th scope="row">Consumer Name</th>
                <td>
                  <input
                    style={{ width: "100%" }}
                    className="form-control p-2"
                    type="text"
                    value={consumername}
                    onChange={(e) => {
                      setConsumername(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Nick Name</th>
                <td>
                  <input
                    style={{ width: "100%" }}
                    className="form-control p-2"
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row"> Parent Name</th>
                <td>
                  <input
                    style={{ width: "100%" }}
                    className="form-control p-2"
                    type="text"
                    value={parentname}
                    onChange={(e) => {
                      setParentname(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Current User</th>
                <td>
                  <input
                    style={{ width: "100%" }}
                    className="form-control p-2"
                    type="text"
                    value={currentuser}
                    onChange={(e) => {
                      setCurrentuser(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Phone No</th>
                <td>
                  <input
                    style={{ width: "100%" }}
                    className="form-control p-2"
                    type="text"
                    value={mobilenumber}
                    onChange={(e) => {
                      setMobilenumber(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Location</th>
                <td>
                  <input
                    style={{ width: "100%" }}
                    className="form-control p-2"
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value.toUpperCase());
                    }}
                  ></input>
                </td>
              </tr>
              <tr className="">
                <td className="" colSpan={2}>
                  <div className="container-fluid d-flex justify-content-end">
                    <button type="submit" className="btn btn-success">
                      <i className="bi bi-floppy-fill"></i> Save
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <Toaster/>
    </>
  );
}

export default AddConsumer;
