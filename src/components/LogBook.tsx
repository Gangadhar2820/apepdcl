import React, { useEffect, useState } from "react";
import { getLogData, addLogData, deleteLogData } from "../services/LogBookService";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { consumers } from "stream";

function LogBook() {
  const [currentDate, setCurrentDate] = useState("");
  const [areacode, setAreacode] = useState("label");
  const [serviceno, setServiceno] = useState("");
  const [consumername, setConsumername] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [money, setMoney] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [reason,setReason] = useState("");
  const [location,setLocation] = useState("");

  const [isAreaCodeValid, setIsAreaCodeValid] = useState(false);
  const [isServiceNoValid, setIsServiceNoValid] = useState(false);

  const [logData, setLogData] = useState<any>([]);

  useEffect(() => {
    validateForm();
  }, [areacode, serviceno]);

  useEffect(() => {
    getLogData().then((res) => {
      setLogData(res);
    });
  }, [logData]);

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

  const handleAddLog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setIsUploading(true);
      addLogData({
        DATE: currentDate,
        AREA_CODE: areacode,
        SERVICE_NO: serviceno,
        CONSUMER_NAME: consumername,
        MONEY: money,
        MOBILE_NUMBER: mobilenumber,
        LOCATION:location,
        REASON:reason
      }).then((res) => {
        setIsUploading(false);
      });
    } else {
      window.alert("Invalid data");
    }
    getLogData().then((res) => {
      setLogData(res);
    });
  };

  const customServiceNo = (ele:any)=>{
    return `115466${ele?.AREA_CODE}${ele?.SERVICE_NO}`
  }

  const deleteLogButton = (ele:any)=>{
    return <button className="btn btn-danger" onClick={()=>{
      deleteLogData(ele?._id)
    }}><i className="bi bi-trash3"></i></button>
  }

  return (
    <>
      <div className="card">
        {isUploading && (
          <div
            className="spinner-grow text-info"
            style={{
              width: "90px",
              height: "90px",
              position: "absolute",
              left: "40%",
              top: "40%",
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
              Uploading
            </span>
          </div>
        )}
        <form method="post" onSubmit={handleAddLog}>
          <table className="table table-success table-borderless text-start table-striped caption-top">
            <tbody>
              <tr>
                <th scope="row">Date</th>
                <td>
                  <input
                    style={{ width: "100%" }}
                    className="form-control p-2"
                    type="date"
                    value={currentDate}
                    onChange={(e) => {
                      setCurrentDate(e.target.value);
                    }}
                    required
                  ></input>
                </td>
              </tr>
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
                    <option value="label"> Area code </option>
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

                    <option value="label">--------- AGL ---------</option>

                    <option value="5001">5001 - Apandrapalem</option>
                    <option value="2410">2410 - Burugupalem</option>
                    <option value="5004">5004 - Burugupalem</option>
                    <option value="5018">5018 - Tadapala</option>
                    <option value="2411">2411 - Tootipala</option>
                    <option value="5020">5020 - Tootipala</option>
                    <option value="5030">5030 - Tootipala</option>
                    <option value="5073">5073 - K Tootipala</option>
                    <option value="5081">5081 - K Tootipala</option>
                    <option value="5077">5077 - Ramarayudupalem</option>
                    <option value="5072">5072 - Mamidipalem</option>
                    <option value="5079">5079 - Adigarlapalem</option>
                    <option value="5078">5078 - Pothaluru</option>
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
                <th scope="row">Money</th>
                <td>
                  <input
                    style={{ width: "100%" }}
                    className="form-control p-2"
                    type="text"
                    value={money}
                    required
                    onChange={(e) => {
                      setMoney(e.target.value);
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
                      setLocation(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>

              <tr>
                <th scope="row">Reason</th>
                <td>
                  <textarea
                    style={{ width: "100%" }}
                    className="form-control p-2"
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  ></textarea>
                </td>
              </tr>

              <tr className="">
                <td className="" colSpan={2}>
                  <div className="container-fluid d-flex justify-content-end">
                    <button type="submit" className="btn btn-success">
                      <i className="bi bi-floppy-fill"></i> Upload
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className="custom-datatable">
        <DataTable value={logData} tableStyle={{ minWidth: "50rem" }}>
          <Column field="DATE" header="Date"></Column>
          <Column  header="Service no" body={customServiceNo}></Column>
          <Column field="CONSUMER_NAME" header="Consumer name"></Column>
          <Column field="MONEY" header="Money"></Column>
          <Column field="MOBILE_NUMBER" header="Phone no"></Column>
          <Column field="LOCATION" header="Location"></Column>
          <Column field="REASON" header="Reason"></Column>
          <Column body={deleteLogButton}></Column>
        </DataTable>
      </div>
    </>
  );
}

export default LogBook;
