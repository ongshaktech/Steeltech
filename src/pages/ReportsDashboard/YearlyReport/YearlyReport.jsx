import React, { useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";
import { query } from "firebase/database";
import { ProductTypes } from "../../../data/constants";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFileDownload } from "react-icons/fa";

export default function YearlyReport() {
  const collection_name = "machinesIndividual";
  const damaged_collection = "damagedProducts";
  let tableRef = useRef(null);
  // let MachineNo = new Set([]);

  const currentYear = parseInt(new Date().getFullYear());
  let startYear = useRef(null);
  let endYear = useRef(null);

  let [btnStatus, setBtnStatus] = useState(true);
  let [MachineNoList, setMachineNoList] = useState(new Set([]));

  useEffect(() => {
    let MachineNo = new Set([]);
    // Get Machine Number List
    const ref = doc(db_firestore, `information`, "info");
    getDoc(ref).then((data) => {
      let list = data.data();
      list["forming_machine"].forEach((index) => {
        MachineNo.add(index);
      });
      list["polish_machine"].forEach((index) => {
        MachineNo.add(index);
      });
      setMachineNoList(MachineNo);
    });
  }, []);

  const generateReport = () => {
    let dataNum = 0;
    let startDate = new Date();
    startDate.setMilliseconds(0);
    startDate.setSeconds(0);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setDate(1);
    startDate.setMonth(0);
    startDate.setFullYear(startYear.current.value);

    setTableStatus("Please Be Patient ...");
    setBtnStatus(false);

    const putData = (dateInfo) => {
      let startDate = new Date(dateInfo);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);

      let endDate = new Date(dateInfo);
      endDate.setMonth(11);
      endDate.setDate(31);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);

      console.log(startDate, endDate);

      const ref = collection(db_firestore, collection_name);

      Array.from(MachineNoList).map((machine_no, index_m) => {
        ProductTypes.map((value, index_p) => {
          let morning_count = 0,
            morning_weight = 0;
          let night_count = 0,
            night_weight = 0;
          let TP = 0;
          let TW = 0;
          let doc_length = 0;
          let morning_damaged = 0,
            night_damaged = 0;

          const q = query(
            ref,
            where("unix_time", ">=", Math.floor(startDate.getTime() / 1000)),
            where("unix_time", "<=", Math.floor(endDate.getTime() / 1000)),
            where("machine_no", "==", machine_no),
            where("product_type", "==", value)
          );

          getDocs(q).then((snapShot) => {
            snapShot.forEach((doc) => {
              doc_length++;
              dataNum++;
              const data = doc.data();
              if (data["shift"] === "Morning") {
                if (parseFloat(data["weight"]) > 0) {
                  morning_count += Math.abs(parseInt(data["count"]));
                  morning_weight += parseFloat(data["weight"]);
                }
              } else {
                if (parseFloat(data["weight"]) > 0) {
                  night_count += Math.abs(parseInt(data["count"]));
                  night_weight += parseFloat(data["weight"]);
                }
              }
            });

            TP = morning_count + night_count;
            TW = (night_weight + morning_weight).toFixed(2);

            // ---------- damaged count ------------
            let ref = collection(db_firestore, damaged_collection);
            let q = query(
              ref,
              where("unix_time", ">=", Math.floor(startDate.getTime() / 1000)),
              where("unix_time", "<=", Math.floor(endDate.getTime() / 1000)),
              where("machine_no", "==", machine_no),
              where("product_type", "==", value)
            );

            getDocs(q).then((snapShot) => {
              snapShot.forEach((doc) => {
                const data = doc.data();
                if (data["shift"] === "Morning") {
                  morning_damaged += parseInt(data["damagedProductCount"]);
                } else {
                  night_damaged += parseInt(data["damagedProductCount"]);
                }
              });

              if (doc_length !== 0)
                appendTableRow(
                  startDate.getFullYear(),
                  machine_no,
                  value,

                  morning_damaged,
                  morning_count,
                  morning_weight.toFixed(2),
                  morning_count - morning_damaged,

                  night_damaged,
                  night_count,
                  night_weight.toFixed(2),
                  night_count - night_damaged,

                  TP - morning_damaged - night_damaged,
                  TW
                );
              if (
                (index_m + 1) * (index_p + 1) ===
                MachineNoList.size * ProductTypes.length
              ) {
                if (dataNum === 0)
                  setTableStatus("No Data Available in this Date Range");
                setBtnStatus(true);
              }
            });
          });
        });
      });
    };

    for (
      let i = 0;
      i < endYear.current.value - startYear.current.value + 1;
      i++
    ) {
      putData(startDate);
      startDate.setFullYear(startDate.getFullYear() + 1);
    }
  };

  const setTableStatus = (prompt) => {
    tableRef.current.innerHTML = `<tr>
              <td class="border border-black p-2 text-center" id='reportStatus' colSpan="13">
                  ${prompt}
              </td>
          </tr>`;
  };

  const appendTableRow = (
    date,
    machine_no,
    product_type,

    m_damaged,
    m_count,
    m_weight,
    m_net,

    n_damaged,
    n_count,
    n_weight,
    n_net,

    tp,
    tw
  ) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
          <td className="border border-black p-2">${date}</td>
          <td className="border border-black p-2">${machine_no}</td>
          <td className="border border-black p-2">${product_type}</td>

          <td className="border border-black p-2">${m_count}</td>
          <td className="border border-black p-2">${m_damaged}</td>
          <td className="border border-black p-2">${m_net}</td>
          <td className="border border-black p-2">${m_weight}</td>

          <td className="border border-black p-2">${n_count}</td>
          <td className="border border-black p-2">${n_damaged}</td>
          <td className="border border-black p-2">${n_net}</td>
          <td className="border border-black p-2">${n_weight}</td>

          <td className="border border-black p-2">${tp}</td>
          <td className="border border-black p-2">${tw}</td>
          </tr>`;
    let ele = document.getElementById("reportStatus");
    if (ele !== null) {
      ele.remove();
    }
    tableRef.current.appendChild(tr);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold py-8">Quarterly Report </h2>

      <div className="container mx-auto flex gap-4 justify-center items-center mb-10">
        <h2>From</h2>
        <select
          ref={startYear}
          className="p-2 rounded-md outline-none focus:outline-none border border-gray-400"
        >
          <option value={currentYear}>{currentYear}</option>
          <option value={currentYear - 1}>{currentYear - 1}</option>
          <option value={currentYear - 2}>{currentYear - 2}</option>
          <option value={currentYear - 3}>{currentYear - 3}</option>
          <option value={currentYear - 4}>{currentYear - 4}</option>
        </select>
        to
        <select
          ref={endYear}
          className="p-2 rounded-md outline-none focus:outline-none border border-gray-400"
        >
          <option value={currentYear}>{currentYear}</option>
          <option value={currentYear - 1}>{currentYear - 1}</option>
          <option value={currentYear - 2}>{currentYear - 2}</option>
          <option value={currentYear - 3}>{currentYear - 3}</option>
          <option value={currentYear - 4}>{currentYear - 4}</option>
        </select>
        <button
          onClick={generateReport}
          disabled={!btnStatus}
          className="px-6 py-2 rounded-full bg-purple-500 text-white"
        >
          {btnStatus ? "Generate" : "Please Wait ..."}
        </button>
        <button
          onClick={() => {
            window.print();
          }}
          className="px-6 py-2 rounded-full bg-primary text-white"
        >
          Print
        </button>
        <button className="px-6 py-2 rounded-full bg-primary text-white flex gap-3 items-center">
          Download Excel Report <FaFileDownload />
        </button>
        {/* <ReactHTMLTableToExcel
    id="xls-download-btn"
    className="download-table-xls-button"
    table="table-to-xls"
    filename={`daily_report_${new Date().toLocaleDateString()}`}
    sheet="tablexls"
    buttonText={<FaFileDownload />}
  /> */}
      </div>

      <div className="w-full">
        <table id="table-to-xls" className="w-full">
  <thead className="bg-primary text-white font-light rounded-lg">
    <tr>
      <th className="border border-black p-2" rowSpan="2">
        Date
      </th>
      <th className="border border-black p-2" rowSpan="2">
        Machine No.
      </th>
      <th className="border border-black p-2" rowSpan="2">
        Product Type
      </th>
      <th className="border border-black p-2" colSpan="4">
        Morning
      </th>
      <th className="border border-black p-2" colSpan="4">
        Night
      </th>
      <th className="border border-black p-2" rowSpan="2">
        Total Product
      </th>
      <th className="border border-black p-2" rowSpan="2">
        Total Weight
      </th>
    </tr>
    <tr>
      <th className="border border-black p-2">Total</th>
      <th
        style={{
          color: "#bd0000",
        }}
        className="border border-black p-2"
      >
        Damaged
      </th>
      <th className="border border-black p-2">Net</th>
      <th className="border border-black p-2">Weight</th>

      <th className="border border-black p-2">Total</th>
      <th
        style={{
          color: "#bd0000",
        }}
        className="border border-black p-2"
      >
        Damaged
      </th>
      <th className="border border-black p-2">Net</th>
      <th className="border border-black p-2">Weight</th>
    </tr>
  </thead>

          <tbody ref={tableRef}>
            <tr>
              <td
                className="border border-gray-500 text-center py-4 "
                colSpan="13"
              >
                Plase Select a Date Range
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   where,
//   query,
// } from "firebase/firestore";
// import { db_firestore } from "../../../Hooks/config";
// import { ProductTypes } from "../../../data/constants";
// import { FaFileDownload } from "react-icons/fa";

// export default function YearlyReport() {
//   const collectionName = "machinesIndividual";
//   const damagedCollection = "damagedProducts";

//   const currentYear = new Date().getFullYear();
//   const [startYear, setStartYear] = useState(currentYear);
//   const [endYear, setEndYear] = useState(currentYear);
//   const [machineNoList, setMachineNoList] = useState([]);
//   const [tableRows, setTableRows] = useState([]);
//   const [btnStatus, setBtnStatus] = useState(true);
//   const [statusMessage, setStatusMessage] = useState(
//     "Please Select a Date Range"
//   );

//   useEffect(() => {
//     const fetchMachineNumbers = async () => {
//       const ref = doc(db_firestore, "information", "info");
//       const data = await getDoc(ref);
//       const machineList = new Set([
//         ...(data.data()?.forming_machine || []),
//         ...(data.data()?.polish_machine || []),
//       ]);
//       setMachineNoList([...machineList]);
//     };
//     fetchMachineNumbers();
//   }, []);

//   const generateReport = async () => {
//     setBtnStatus(false);
//     setStatusMessage("Generating Report. Please wait...");

//     const startDate = new Date(startYear, 0, 1);
//     const endDate = new Date(endYear, 11, 31, 23, 59, 59);

//     const promises = [];

//     machineNoList.forEach((machineNo) => {
//       ProductTypes.forEach((productType) => {
//         promises.push(
//           fetchMachineData(startDate, endDate, machineNo, productType)
//         );
//       });
//     });

//     const results = await Promise.all(promises);
//     const flattenedRows = results.flat();
//     if (flattenedRows.length === 0) {
//       setStatusMessage("No Data Available in this Date Range");
//     } else {
//       setTableRows(flattenedRows);
//     }

//     setBtnStatus(true);
//   };

//   const fetchMachineData = async (
//     startDate,
//     endDate,
//     machineNo,
//     productType
//   ) => {
//     const ref = collection(db_firestore, collectionName);
//     const damagedRef = collection(db_firestore, damagedCollection);

//     const q = query(
//       ref,
//       where("unix_time", ">=", Math.floor(startDate.getTime() / 1000)),
//       where("unix_time", "<=", Math.floor(endDate.getTime() / 1000)),
//       where("machine_no", "==", machineNo),
//       where("product_type", "==", productType)
//     );

//     const docs = await getDocs(q);
//     const data = processDocs(docs);

//     const damagedQuery = query(
//       damagedRef,
//       where("unix_time", ">=", Math.floor(startDate.getTime() / 1000)),
//       where("unix_time", "<=", Math.floor(endDate.getTime() / 1000)),
//       where("machine_no", "==", machineNo),
//       where("product_type", "==", productType)
//     );

//     const damagedDocs = await getDocs(damagedQuery);
//     const damagedData = processDamagedDocs(damagedDocs);

//     return createTableRow(
//       startDate.getFullYear(),
//       machineNo,
//       productType,
//       data,
//       damagedData
//     );
//   };

//   const processDocs = (docs) => {
//     let morningCount = 0,
//       morningWeight = 0;
//     let nightCount = 0,
//       nightWeight = 0;

//     docs.forEach((doc) => {
//       const data = doc.data();
//       if (data.shift === "Morning") {
//         morningCount += Math.abs(parseInt(data.count));
//         morningWeight += parseFloat(data.weight);
//       } else {
//         nightCount += Math.abs(parseInt(data.count));
//         nightWeight += parseFloat(data.weight);
//       }
//     });

//     return {
//       morningCount,
//       morningWeight: morningWeight.toFixed(2),
//       nightCount,
//       nightWeight: nightWeight.toFixed(2),
//       totalProducts: morningCount + nightCount,
//       totalWeight: (morningWeight + nightWeight).toFixed(2),
//     };
//   };

//   const processDamagedDocs = (docs) => {
//     let morningDamaged = 0,
//       nightDamaged = 0;

//     docs.forEach((doc) => {
//       const data = doc.data();
//       if (data.shift === "Morning") {
//         morningDamaged += parseInt(data.damagedProductCount);
//       } else {
//         nightDamaged += parseInt(data.damagedProductCount);
//       }
//     });

//     return { morningDamaged, nightDamaged };
//   };

//   const createTableRow = (year, machineNo, productType, data, damagedData) => {
//     const {
//       morningCount,
//       morningWeight,
//       nightCount,
//       nightWeight,
//       totalProducts,
//       totalWeight,
//     } = data;

//     const { morningDamaged, nightDamaged } = damagedData;

//     return {
//       year,
//       machineNo,
//       productType,
//       morningCount,
//       morningDamaged,
//       morningNet: morningCount - morningDamaged,
//       morningWeight,
//       nightCount,
//       nightDamaged,
//       nightNet: nightCount - nightDamaged,
//       nightWeight,
//       totalProducts: totalProducts - morningDamaged - nightDamaged,
//       totalWeight,
//     };
//   };

//   console.log("tableRows", tableRows)

//   return (
//     <div>
//       <h2 className="text-2xl font-bold py-8">Yearly Report</h2>
//       {/* Date Range Selector */}
//       <div className="container mx-auto flex gap-4 justify-center items-center mb-10">
//         <h2>From</h2>
//         <select
//           value={startYear}
//           onChange={(e) => setStartYear(parseInt(e.target.value))}
//           className="p-2 rounded-md border border-gray-400"
//         >
//           {[...Array(5)].map((_, i) => (
//             <option key={i} value={currentYear - i}>
//               {currentYear - i}
//             </option>
//           ))}
//         </select>
//         <h2>To</h2>
//         <select
//           value={endYear}
//           onChange={(e) => setEndYear(parseInt(e.target.value))}
//           className="p-2 rounded-md border border-gray-400"
//         >
//           {[...Array(5)].map((_, i) => (
//             <option key={i} value={currentYear - i}>
//               {currentYear - i}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={generateReport}
//           disabled={!btnStatus}
//           className="px-6 py-2 rounded-full bg-purple-500 text-white"
//         >
//           {btnStatus ? "Generate" : "Please Wait..."}
//         </button>
//       </div>

//       {/* Table */}
//       <div className="w-full">
//         <table
//           id="reportTable"
//           className="w-full border-collapse border border-gray-300"
//         >
//           <thead className="bg-primary text-white font-light rounded-lg">
//             <tr>
//               <th className="border border-black p-2" rowSpan="2">
//                 Date
//               </th>
//               <th className="border border-black p-2" rowSpan="2">
//                 Machine No.
//               </th>
//               <th className="border border-black p-2" rowSpan="2">
//                 Product Type
//               </th>
//               <th className="border border-black p-2" colSpan="4">
//                 Morning
//               </th>
//               <th className="border border-black p-2" colSpan="4">
//                 Night
//               </th>
//               <th className="border border-black p-2" rowSpan="2">
//                 Total Product
//               </th>
//               <th className="border border-black p-2" rowSpan="2">
//                 Total Weight
//               </th>
//             </tr>
//             <tr>
//               <th className="border border-black p-2">Total</th>
//               <th
//                 style={{
//                   color: "#bd0000",
//                 }}
//                 className="border border-black p-2"
//               >
//                 Damaged
//               </th>
//               <th className="border border-black p-2">Net</th>
//               <th className="border border-black p-2">Weight</th>

//               <th className="border border-black p-2">Total</th>
//               <th
//                 style={{
//                   color: "#bd0000",
//                 }}
//                 className="border border-black p-2"
//               >
//                 Damaged
//               </th>
//               <th className="border border-black p-2">Net</th>
//               <th className="border border-black p-2">Weight</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableRows.length > 0 ? (
//               tableRows.map((row, idx) => (
//                 <tr key={idx}>{/* Render Row Data */}</tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="13" className="text-center p-4">
//                   {statusMessage}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
