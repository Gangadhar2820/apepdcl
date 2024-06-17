import React, { useEffect, useState } from "react";
import { Consumer, getAreaWiseData } from "../services/ServicenoService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";

function SearchAreaCode() {
  const [areacode, setAreacode] = useState("label");
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [consumers, setConsumers] = useState<Consumer[] | null>();
  const [globalSearchValue, setGlobalSearchValue] = useState("");
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {}, [consumers, areacode, showTable]);

  const validateForm = () => {
    setIsFormValid(false);
    const isValid = areacode !== "label";
    setIsFormValid(isValid);
    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    setIsFormValid(isValid);
    if (isValid) {
      setIsLoading(true);
      setConsumers(null);
      setShowTable(false);
      getAreaWiseData(areacode).then((data) => {
        data.sort(
          (a: any, b: any) => parseInt(a.SERVICE_NO) - parseInt(b.SERVICE_NO)
        );

        setConsumers(data);
        setIsLoading(false);
        if (data) {
          setShowTable(true);
        }
      });
    }
  };

  const customServiceNoTemplate = (rowData: any) => {
    console.log(rowData)
    return (
      
        <Link to={`/searchserviceno/${areacode}/${rowData.SERVICE_NO}`} className="a nav-link" aria-current="page">
          {rowData.SERVICE_NO}
        </Link>
      
    );
  };
  return (
    <>
      <div className="container-fluid row">
        <div className="card">
          <div className="card-head ">
            <h5 className="card-title text-center p-3">Area wise data</h5>
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
            {isFormValid ? (
              ""
            ) : (
              <p className="text-center" style={{ color: "red" }}>
                Invalid Area code
              </p>
            )}
          </div>

          <div className="card-body text-center">
            {isLoading && (
              <div
                className="spinner-grow text-info"
                style={{ width: "90px", height: "90px" }}
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
                  Loading...
                </span>
              </div>
            )}
            {showTable && (
              <>
                <div className="flex justify-content-end">
                  <input
                    style={{ width: "50%" }}
                    type="text"
                    className="form-control m-5 bg-light"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Search here"
                    value={globalSearchValue}
                    onChange={(e) => {
                      setGlobalSearchValue(e.target.value);
                    }}
                  ></input>
                </div>

                <div className="custom-datatable">
                  <DataTable
                    value={consumers || []}
                    size={"large"}
                    showGridlines
                    stripedRows
                    tableStyle={{ minWidth: "50rem" }}
                    className="custom-datatable"
                    globalFilter={globalSearchValue}
                    scrollable
                    scrollHeight="500px"
                  >
                    <Column
                      field="SERVICE_NO"
                      sortable
                      frozen
                      alignFrozen="left"
                      header="Service No  "
                      body={customServiceNoTemplate}
                    ></Column>
                    <Column
                      field="CONSUMER_NAME"
                      header="Consumer Name"
                    ></Column>
                    <Column field="NICK_NAME" header="Nick Name"></Column>
                    <Column field="PARENT_NAME" header="Parent Name"></Column>
                    <Column field="CURRENT_USER" header="Current User"></Column>
                    <Column field="MOBILE_NUMBER" header="Phone No"></Column>
                    <Column
                      field="LOCATION"
                      sortable
                      header="Location"
                    ></Column>
                  </DataTable>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchAreaCode;
