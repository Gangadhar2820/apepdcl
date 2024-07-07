import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Consumer, getAreaWiseData } from "../services/ServicenoService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function SearchAreaCode() {
  const [areacode, setAreacode] = useState("label");
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [consumers, setConsumers] = useState<Consumer[] | null>();
  const [globalSearchValue, setGlobalSearchValue] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

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

  const columns = useMemo(
    () => [
      { field: "SERVICE_NO", header: "Service No", sortable: true },
      { field: "CONSUMER_NAME", header: "Consumer Name" },
      { field: "NICK_NAME", header: "Nick Name" },
      { field: "PARENT_NAME", header: "Parent Name" },
      { field: "CURRENT_USER", header: "Current User" },
      { field: "MOBILE_NUMBER", header: "Phone No" },
      { field: "LOCATION", header: "Location", sortable: true },
    ],
    []
  );

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSetSearchValue = useCallback(
    debounce((value) => setDebouncedSearchValue(value), 500),
    []
  );

  useEffect(() => {
    debouncedSetSearchValue(globalSearchValue);
  }, [globalSearchValue, debouncedSetSearchValue]);

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
                    globalFilter={debouncedSearchValue}
                    scrollable
                    scrollHeight="500px"
                  >
                    {columns.map((col, index) =>
                      col.field === "SERVICE_NO" ? (
                        <Column
                          key={index}
                          field={col.field}
                          header={col.header}
                          sortable={col.sortable}
                          frozen
                          alignFrozen="left"
                        />
                      ) : (
                        <Column
                          key={index}
                          field={col.field}
                          header={col.header}
                          sortable={col.sortable}
                        />
                      )
                    )}
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
