import React, { useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";
import { query } from "firebase/database";
import { ProductTypes } from "../../../data/constants";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FaFileDownload } from "react-icons/fa";

export default function DailyReport() {
  const collection_name = "machinesIndividual";
  const damaged_collection = "damagedProducts";

  let dateStartRef = useRef(null);
  let dateEndRef = useRef(null);
  let tableRef = useRef(null);
  let [btnStatus, setBtnStatus] = useState(true);
  let [MachineNoList, setMachineNoList] = useState(new Set([]));

  useEffect(() => {
    dateEndRef.current.valueAsDate = new Date();
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

  function generateReport() {
    let dataNum = 0;
    let startDate = new Date(dateStartRef.current.value);
    let endDate = new Date(dateEndRef.current.value);

    if (dateStartRef.current.value === "" || dateEndRef.current.value === "") {
      setTableStatus("Invalid Parameters!");
      return null;
    } else if (startDate.getTime() > endDate.getTime()) {
      setTableStatus("Start date should be less than End Date");
      return null;
    }

    setTableStatus("Please be Patient ...");
    setBtnStatus(false);

    async function putData(dateInfo) {
      let startDate = new Date(dateInfo);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);

      let endDate = new Date(dateInfo);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);

      // console.log(startDate, endDate);

      let ref = collection(db_firestore, collection_name);

      Array.from(MachineNoList).map((machine_no, index_m) => {
        ProductTypes.map((value, index_p) => {
          let morning_count = 0.0,
            morning_weight = 0.0;
          let night_count = 0,
            night_weight = 0;
          let TP = 0;
          let TW = 0;
          let doc_length = 0;
          let morning_damaged = 0,
            night_damaged = 0;

          let q = query(
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

            TP = (morning_count + night_count).toFixed(2);
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

              // ---------- append to table ------------
              if (doc_length !== 0)
                appendTableRow(
                  `${startDate.getDate()}/${
                    startDate.getMonth() + 1
                  }/${startDate.getFullYear()}`,
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
    }

    while (true) {
      putData(endDate);
      if (startDate.getTime() === endDate.getTime()) break;
      endDate.setDate(endDate.getDate() - 1);
    }
  }

  const setTableStatus = (prompt) => {
    tableRef.current.innerHTML = `<tr id="reportStatus" >
              <td class="border border-gray-500 text-center py-4 " colSpan="13">
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
    // tr.className = ' border border-black p-2 ';
    tr.innerHTML = `
      <tr>
        <td class="border border-black p-4">${date}</td>
        <td class="border border-black p-4">${machine_no}</td>
        <td class="border border-black p-4">${product_type}</td>
        
        <td class="border border-black p-4">${m_count}</td>
        <td class="border border-black p-4">${m_damaged}</td>
        <td class="border border-black p-4">${m_net}</td>
        <td class="border border-black p-4">${m_weight}</td>
        
        <td class="border border-black p-4">${n_count}</td>
        <td class="border border-black p-4">${n_damaged}</td>
        <td class="border border-black p-4">${n_net}</td>
        <td class="border border-black p-4">${n_weight}</td>
        
        <td class="border border-black p-4">${tp}</td>
        <td class="border border-black p-4">${tw}</td>
      </tr>
    `;

    let ele = document.getElementById("reportStatus");
    if (ele !== null) {
      ele.remove();
    }

    tableRef.current.appendChild(tr);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold py-8">Daily Report </h2>

      <div className="container mx-auto flex gap-4 justify-center items-center mb-10">
        <div className="flex gap-4 items-center">
          <h2>From</h2>
          <input
            type="date"
            ref={dateStartRef}
            className="p-2 rounded-md outline-none focus:outline-none border border-gray-400"
            placeholder="From"
          />{" "}
          {/*less*/}
          <h2>To</h2>
          <input
            type="date"
            ref={dateEndRef}
            className="p-2 rounded-md outline-none focus:outline-none border border-gray-400"
            placeholder="To"
          />
        </div>
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
              <th rowSpan="2" className="border border-black">
                Date
              </th>
              <th rowSpan="2" className="border border-black">
                Machine No.
              </th>
              <th rowSpan="2" className="border border-black">
                Product Type
              </th>
              <th colSpan="4" className="border border-black">
                Morning
              </th>
              <th colSpan="4" className="border border-black">
                Night
              </th>
              <th rowSpan="2" className="border border-black">
                Total Product
              </th>
              <th rowSpan="2" className="border border-black">
                Total Weight
              </th>
            </tr>
            <tr className="border border-black">
              <th className="border border-black">Total</th>
              <th
                style={{
                  color: "#bd0000",
                }}
                className="border border-black"
              >
                Damaged
              </th>
              <th className="border border-black">Net</th>
              <th className="border border-black">Weight</th>

              <th className="border border-black">Total</th>
              <th
                style={{
                  color: "#bd0000",
                }}
                className="border border-black"
              >
                Damaged
              </th>
              <th className="border border-black">Net</th>
              <th className="border border-black">Weight</th>
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
      {/* <DailyReportTable
      /> */}
    </div>
  );
}
