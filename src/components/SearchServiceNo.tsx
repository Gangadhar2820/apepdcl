// import React, { useEffect, useState } from "react";
// import {
//   getConsumerDataByServiceNo,
//   Consumer,
// } from "../services/ServicenoService";

// function SearchServiceNo() {

//   const [isSearchFormValid, setIsSearchFormValid] = useState<boolean>(false);
//   const [showFormResult, setShowFormResult] = useState(false);
//   

//   useEffect(() => {}, [consumer]);

//   const validateForm = () => {
//     let isValid = true;
//     const selectEle = document.querySelector("select");
//     const inputEle = document.querySelector("input");

//     if (areacode === "label") {
//       selectEle?.classList.add("is-invalid");
//       isValid = false;
//     } else {
//       selectEle?.classList.remove("is-invalid");
//     }

//     if (/^[0-9]{6}$/.test(serviceno)) {
//       inputEle?.classList.remove("is-invalid");
//     } else {
//       inputEle?.classList.add("is-invalid");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const isValid = validateForm();
//     setIsSearchFormValid(isValid);

//     if (isValid) {
//       setIsLoading(true);
//       getConsumerDataByServiceNo(
//         areacode.toUpperCase(),
//         serviceno.toUpperCase()
//       )
//         .then((res: Consumer | null) => {
//           setIsLoading(false);
//           if (isValid && consumer?._ID) {
//             setShowFormResult(true);
//           } else {
//             setShowFormResult(false);
//           }
//           setConsumer(res);
//         })
//         .catch((err) => console.log(err));
//     } else {
//       console.log("Form is invalid");
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid row">
//         <div className="card">
          
//           <div className="card-body text-center">
//             {showFormResult && (
//               
//             )}
//             {( consumer && !(isLoading))  && "no user found"}
//             {isLoading && (
             
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SearchServiceNo;

import React from 'react'

function SearchServiceNo() {
  return (
    <div>SearchServiceNo</div>
  )
}

export default SearchServiceNo