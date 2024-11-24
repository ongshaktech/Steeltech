import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db_firestore } from "../../../Hooks/config";
import { ProductThickness } from "../../../data/constants";
import { EfficiencyGraph } from "./EfficiencyGraph";

export default function MachineEfficiencyGraph() {
  const collection_name = "machinesIndividual";
  let [dateStart, setDateStart] = useState(new Date());
  let [dateEnd, setDateEnd] = useState(new Date());
  let tableBodyRef = useRef(null);
  let tableHeaderRef = useRef(null);
  let [MachineNoList, setMachineNoList] = useState(new Set([]));
  let [btnStatus, setBtnStatus] = useState(true);

  let [machineDetails, setMachineDetails] = useState([]);
  let [tableStatus, setTableStatus] = useState("");
  let [thickness, setThickness] = useState("");

  console.log("machineDetails", machineDetails);

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

      // ProductThickness.forEach((thickness) => {
      //   procductThicknessDiv += `<th class="border border-black p-2">${thickness}</th>`;
      // });

      // tableHeaderRef.current.innerHTML = `<tr>${procductThicknessDiv}<tr>`;
    });
  }, []);

  const generateReport = () => {
    let startDate = new Date(dateStart);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(1);
    startDate.setMilliseconds(0);

    let endDate = new Date(dateEnd);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(99);
    endDate.setSeconds(59);

    if (dateEnd === "" || dateStart === "") {
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

  //   const setTableStatus = (prompt) => {
  //     tableBodyRef.current.innerHTML = `<tr>
  //                 <td class='border border-black p-2' id='reportStatus' colSpan=${
  //                   ProductThickness.length + 1
  //                 }>
  //                     ${prompt}
  //                 </td>
  //             </tr>`;
  //   };

  async function putData(startDate, endDate) {
    const ref = collection(db_firestore, "machineStatus");
    const MachineRef = collection(db_firestore, collection_name);
    const currentMachineDetails = [];

    // let machine_number = "01";

    // Getting Time Start and Time End
    let total_time = 0;

    Array.from(MachineNoList).forEach((machine_number, index) => {
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
        //   for (const thickness of ProductThickness) {
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
            ? av_time.push((total_time / count).toFixed(2))
            : av_time.push(0);

          // if (av_time.length === ProductThickness.length) {
          //   //   appendTableRow(machine_number, av_time);
          //   setMachineDetails(prevMachine => [
          //     ...prevMachine,
          //     {
          //       machine_number,
          //       av_time,
          //     },
          //   ]);
          // }
          // if (
          //   index + 1 === MachineNoList.size &&
          //   av_time.length === ProductThickness.length
          // ) {
          //   setBtnStatus(true);
          // }
          // console.log(MachineNoList.size, index);
          // console.log(av_time.length, ProductThickness.length);
        });
        currentMachineDetails.push({
          machine_number,
          av_time,
        });
        //   }

        setMachineDetails(currentMachineDetails);
        setBtnStatus(true);
      });
    });
  }

  return (
    <div className="my-10">
      <div className="flex gap-4 items-center">
        <h2 className="text-3xl font-bold">MachineEfficiencyGraph</h2>

        <input
          type="date"
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
        />

        <select
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
          onChange={(e) => {
            setThickness(e.target.value);
          }}
        >
          <option selected disabled>
            Select Machine Range
          </option>
          {ProductThickness?.map((thickness) => (
            <option selected value={thickness}>
              {thickness}
            </option>
          ))}
        </select>
      <button
        className="bg-primary p-2 rounded-lg text-white"
        onClick={() => generateReport()}
      >
        Set
      </button>
      </div>
      <EfficiencyGraph data={machineDetails} />
    </div>
  );
}
