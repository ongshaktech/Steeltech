import React, { useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";
import { query } from "firebase/database";
import { ProductTypes } from "../../../data/constants";
import { FaFileDownload } from "react-icons/fa";

export default function QuarterlyReport() {
  const damaged_collection = "damagedProducts";
  const collection_name = "machinesIndividual";
  let quarterRange = useRef(null);
  let startMonth = useRef(null);
  let year = useRef(null);
  let tableRef = useRef(null);
  const currentYear = parseInt(new Date().getFullYear());

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
    let dateStart = new Date();
    dateStart.setDate(1);
    dateStart.setHours(0);
    dateStart.setMinutes(0);
    dateStart.setMilliseconds(0);
    dateStart.setSeconds(0);
    dateStart.setMonth(startMonth.current.value);
    dateStart.setFullYear(year.current.value);

    if (quarterRange.current.value === "" || quarterRange.current.value <= 0) {
      setTableStatus("Quarter Range cannot be empty!");
      return null;
    } else if (startMonth.current.value === "") {
      setTableStatus("Start month cannot be empty!");
      return null;
    }

    setTableStatus("Please Be Patient ...");
    setBtnStatus(false);

    const putData = (dateInfo) => {
      let startDate = new Date(dateInfo);

      let endDate = new Date(dateInfo);
      endDate.setSeconds(59);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setDate(0);
      endDate.setMonth(endDate.getMonth() + 4);

      const ref = collection(db_firestore, collection_name);

      Array.from(MachineNoList).map((machine_no, index_m) => {
        ProductTypes.map((value, index_p) => {
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
              if (parseFloat(data["weight"]) > 0) {
                TW += parseFloat(data["weight"]);
                TP += Math.abs(parseInt(data["count"]));
              }
            });

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

                console.log(
                  "Morning Damaged",
                  morning_damaged,
                  "Night Damaged",
                  night_damaged
                );
              });

              if (doc_length !== 0)
                appendTableRow(
                  `${startDate.toLocaleString("default", {
                    month: "long",
                  })}, ${startDate.getFullYear()} - 
                                      ${endDate.toLocaleString("default", {
                                        month: "long",
                                      })}, ${endDate.getFullYear()}`,
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
    };

    for (let i = 0; i < quarterRange.current.value; i++) {
      putData(dateStart);
      dateStart.setMonth(dateStart.getMonth() + 4);
    }
  };

  const setTableStatus = (prompt) => {
    tableRef.current.innerHTML = `<tr>
              <td class="border border-black p-2" id='reportStatus' colSpan="9">
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
          <td  class="border border-black p-4">${date}</td>
          <td  class="border border-black p-4">${machine_no}</td>
          <td  class="border border-black p-4">${product_type}</td>
          <td  class="border border-black p-4">${damaged}</td>
          <td  class="border border-black p-4">${tp}</td>
          <td  class="border border-black p-4">${net}</td>
          <td  class="border border-black p-4">${tw}</td>
          </tr>`;
    let ele = document.getElementById("reportStatus");
    if (ele) {
      ele.remove();
    }
    tableRef.current.appendChild(tr);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold py-8">Quarterly Report </h2>

      <div className="container mx-auto flex gap-4 flex-col md:flex-row justify-center items-center mb-10">
        <h2>Date</h2>
        <input
          type="number"
          ref={quarterRange}
          placeholder="Quarters"
          style={{ width: "9rem" }}
          className="p-2 rounded-md outline-none focus:outline-none border border-gray-400"
        />
        From
        <select
          ref={startMonth}
          className="p-2 rounded-md outline-none focus:outline-none border border-gray-400"
        >
          <option selected disabled value="">
            Start Month
          </option>
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>
        <select
          ref={year}
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
          className="px-6 py-2 rounded-full bg-black text-white"
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
       
      </div>

      <div className="w-full relative overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary text-white font-light rounded-lg">
            <tr>
              <th className="border border-black p-2">Quarter</th>
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
    </div>
  );
}
