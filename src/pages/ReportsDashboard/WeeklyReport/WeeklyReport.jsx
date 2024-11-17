import React, { useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";
import { query } from "firebase/database";
import { ProductTypes } from "../../../data/constants";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FaFileDownload } from "react-icons/fa";

export default function WeeklyReport() {
    const collection_name = "machinesIndividual";
    const damaged_collection = "damagedProducts";
    let weekRange = useRef(null);
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
  
    const generateReport = () => {
      let dataNum = 0;
      let endDate = new Date(dateEndRef.current.value);
      endDate.setHours(0);
      endDate.setMinutes(0);
      endDate.setMilliseconds(0);
      endDate.setSeconds(0);
  
      let range = parseInt(weekRange.current.value);
  
      if (weekRange.current.value === "" || weekRange.current.value <= 0) {
        setTableStatus("Week Range cannot be empty");
        return null;
      } else if (dateEndRef.current.value === "") {
        setTableStatus("Date is Empty!");
        return null;
      }
  
      setTableStatus("Please be Patient ...");
      setBtnStatus(false);
  
      async function putData(dateInfo, is_last = false) {
        let startDate = new Date(dateInfo);
        startDate.setHours(23);
        startDate.setMinutes(59);
        startDate.setSeconds(59);
  
        let endDate = new Date(dateInfo);
        endDate.setDate(endDate.getDate() - 6);
        endDate.setHours(0);
        endDate.setMinutes(0);
        endDate.setSeconds(0);
  
        console.log(startDate, endDate);
  
        let ref = collection(db_firestore, collection_name);
  
        Array.from(MachineNoList).map((machine_no, index_m) => {
          ProductTypes.map((value, index_p) => {
            let TP = 0;
            let TW = 0;
            let doc_length = 0;
            let morning_damaged = 0,
              night_damaged = 0;
  
            let q = query(
              ref,
              where("unix_time", ">=", Math.floor(endDate.getTime() / 1000)),
              where("unix_time", "<=", Math.floor(startDate.getTime() / 1000)),
              where("machine_no", "==", machine_no),
              where("product_type", "==", value)
            );
  
            getDocs(q).then((snapShot) => {
              snapShot.forEach((doc) => {
                doc_length++;
                dataNum++;
                const data = doc.data();
                if (parseFloat(data["weight"]) > 0) {
                  TW += parseFloat(data["weight"]);
                  TP += Math.abs(parseInt(data["count"]));
                }
              });
  
              // ---------- damaged count ------------
              let ref = collection(db_firestore, damaged_collection);
              let q = query(
                ref,
                where("unix_time", ">=", Math.floor(endDate.getTime() / 1000)),
                where("unix_time", "<=", Math.floor(startDate.getTime() / 1000)),
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
  
                  console.log(
                    "Morning Damaged",
                    morning_damaged,
                    "Night Damaged",
                    night_damaged
                  );
                });
  
                if (doc_length !== 0)
                  appendTableRow(
                    `${startDate.getDate()}/${
                      startDate.getMonth() + 1
                    }/${startDate.getFullYear()} - 
                                      ${endDate.getDate()}/${
                      endDate.getMonth() + 1
                    }/${endDate.getFullYear()}`,
                    machine_no,
                    value,
                    morning_damaged + night_damaged,
                    TP,
                    TP - morning_damaged - night_damaged,
                    parseFloat(TW).toFixed(2)
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
  
      for (let i = 0; i < range; i++) {
        putData(endDate, i + 1 === range);
        endDate.setDate(endDate.getDate() - 7);
      }
    };
  
    const setTableStatus = (prompt) => {
      tableRef.current.innerHTML = `<tr>
              <td class="border border-black p-4 text-center" id='reportStatus' colSpan="9">
                  ${prompt}
              </td>
          </tr>`;
    };
  
    const appendTableRow = (
      date,
      machine_no,
      product_type,
      damaged,
      tp,
      net,
      tw
    ) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<tr>
          <td class="border border-black p-4">${date}</td>
          <td class="border border-black p-4">${machine_no}</td>
          <td class="border border-black p-4">${product_type}</td>
          <td class="border border-black p-4">${damaged}</td>
          <td class="border border-black p-4">${tp}</td>
          <td class="border border-black p-4">${net}</td>
          <td class="border border-black p-4">${tw}</td>
          </tr>`;
      let ele = document.getElementById("reportStatus");
      if (ele) {
        ele.remove();
      }
      tableRef.current.appendChild(tr);
    };
  
    return (
        <div>
        <h2 className="text-2xl font-bold py-8">Weekly Report </h2>
  
        <div className="container mx-auto flex gap-4 justify-center items-center mb-10">
          <div className="flex gap-4 items-center">
            <h2>Date</h2>
            <input
              type="number"
              ref={weekRange}
              className="p-2 rounded-md outline-none focus:outline-none border border-gray-400"
              placeholder="Weeks"
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
              <th className="border border-black p-2">Week</th>
              <th className="border border-black p-2">Machine No.</th>
              <th className="border border-black p-2">Product Type</th>
              <th
                style={{
                  color: "#bd0000",
                }}
                className="border border-black p-2"
              >
                Damaged Product
              </th>
              <th className="border border-black p-2">Total Product</th>
              <th className="border border-black p-2">Net</th>
              <th className="border border-black p-2">Total Weight</th>
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
  )
}
