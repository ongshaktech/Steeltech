import React, { useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";
import { query } from "firebase/database";
import { ProductThickness, ProductTypes } from "../../../data/constants";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFileDownload } from "react-icons/fa";

export default function MachineEfficiency() {
  const collection_name = "machinesIndividual";
  let dateStartRef = useRef(null);
  let dateEndRef = useRef(null);
  let tableBodyRef = useRef(null);
  let tableHeaderRef = useRef(null);
  let [MachineNoList, setMachineNoList] = useState(new Set([]));
  let [btnStatus, setBtnStatus] = useState(true);

  useEffect(() => {
    dateEndRef.current.valueAsDate = new Date();
    let procductThicknessDiv = "<th></th>";
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

      ProductThickness.forEach((thickness) => {
        procductThicknessDiv += `<th class="border border-black p-2">${thickness}</th>`;
      });

      tableHeaderRef.current.innerHTML = `<tr>${procductThicknessDiv}<tr>`;
    });
  }, []);

  const generateReport = () => {
    let startDate = new Date(dateStartRef.current.value);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(1);
    startDate.setMilliseconds(0);

    let endDate = new Date(dateEndRef.current.value);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(99);
    endDate.setSeconds(59);

    if (dateEndRef.current.value === "" || dateStartRef.current.value === "") {
      setTableStatus("Date Ranges cannot be empty!");
      return null;
    } else if (startDate.getTime() > endDate.getTime()) {
      setTableStatus("Start date should be less than end date");
      return null;
    }

    setTableStatus("Please be Patient ...");

    setBtnStatus(false);
    putData(startDate, endDate);
  };

  const setTableStatus = (prompt) => {
    tableBodyRef.current.innerHTML = `<tr>
              <td class='border border-black p-2' id='reportStatus' colSpan=${
      ProductThickness.length + 1
    }>
                  ${prompt}
              </td>
          </tr>`;
  };

  async function putData(startDate, endDate) {
    const ref = collection(db_firestore, "machineStatus");
    const MachineRef = collection(db_firestore, collection_name);

    Array.from(MachineNoList).forEach((machine_number, index) => {
      // Getting Time Start and Time End
      let total_time = 0;

      let q = query(
        ref,
        where("time_start", ">=", Math.floor(startDate.getTime() / 1000)),
        where("time_start", "<=", Math.floor(endDate.getTime() / 1000)),
        where("machine_no", "==", `${machine_number}`),
        where("isRunning", "==", true)
      );

      getDocs(q).then((snap) => {
        if (machine_number === "03") {
          console.log(
            "03",
            Math.floor(startDate.getTime() / 1000),
            Math.floor(endDate.getTime() / 1000)
          );
        }
        snap.forEach((result) => {
          total_time += result.data()["time_end"] - result.data()["time_start"];
          console.log("-------------------");
          console.log(result.data());
        });

        let av_time = [];
        for (const thickness of ProductThickness) {
          let count = 0;
          q = query(
            MachineRef,
            where("unix_time", ">=", Math.floor(startDate.getTime() / 1000)),
            where("unix_time", "<=", Math.floor(endDate.getTime() / 1000)),
            where("machine_no", "==", `${machine_number}`),
            where("thickness", `==`, thickness)
          );

          getDocs(q).then((snap) => {
            snap.forEach((result) => {
              count += parseInt(result.data()["count"]);
            });
            count !== 0
              ? av_time.push(`${(total_time / count).toFixed(2)} sec`)
              : av_time.push("N/A");

            if (av_time.length === ProductThickness.length) {
              appendTableRow(machine_number, av_time);
            }
            if (
              index + 1 === MachineNoList.size &&
              av_time.length === ProductThickness.length
            ) {
              setBtnStatus(true);
            }
            // console.log(MachineNoList.size, index);
            // console.log(av_time.length, ProductThickness.length);
          });
        }
      });
    });
  }

  const appendTableRow = (machine_no, avTimes) => {
    let times = avTimes.map((avTime) => `<td>${avTime}</td>`);
    times = times.join("");

    const tr = document.createElement("tr");
    tr.innerHTML = `<tr class="border border-black p-2">
          <td class="border border-black p-2"><b>FM ${machine_no}</b></td>
          ${times}
          </tr>`;

    let ele = document.getElementById("reportStatus");
    if (ele) {
      ele.remove();
    }
    tableBodyRef.current.appendChild(tr);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold py-8">Machine Efficiency </h2>

      <div className="container mx-auto flex gap-4 justify-center items-center mb-10">
        <h2>From</h2>
        <input
          type="date"
          ref={dateStartRef}
          placeholder="Quarters"
          style={{ width: "9rem" }}
          className="p-2 rounded-md outline-none focus:outline-none border border-gray-400"
        />
        To
        <input
          type="date"
          ref={dateEndRef}
          placeholder="Quarters"
          style={{ width: "9rem" }}
          className="p-2 rounded-md outline-none focus:outline-none border border-gray-400"
        />
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
          <thead className="bg-primary text-white font-light rounded-lg" ref={tableHeaderRef}>
          </thead>

          <tbody ref={tableBodyRef}>
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
