import React, { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import active_machine_analytics from "../../../assets/images/active_machine_analytics.svg";
import idle_machine_analytics from "../../../assets/images/idle_machine_analytics.svg";
import total_machine_analytics from "../../../assets/images/total_machine_analytics.svg";
import Machine_Logo from "../../../assets/images/Machine_Logo.svg";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";
import { query } from "firebase/database";

export default function ListOfIdleMachine() {
  let [formingMachine, setFormingMachine] = useState([]);
  let [activeMachine, setActiveMachine] = useState([]);
  let [inActiveMachine, setInActiveMachine] = useState([]);

  let [portion, setPortion] = useState("all");

  async function GetMachineIndexs() {
    const ref = doc(db_firestore, `information`, "info");
    const querySnapshot = await getDoc(ref);
    return querySnapshot.data();
  }

  useEffect(() => {
    const threshold_sec = 10 * 60; // 10 minutes

    GetMachineIndexs().then((data) => {
      const ref = collection(db_firestore, `machineStatus`);

      let f_machine_arr = data?.forming_machine || [];
      let totalMachines = f_machine_arr.length;
      let completedFetches = 0;

      if (totalMachines === 0) {
        setDataLoaded(true);
        setDataAvailable(false);
        return;
      }

      // sorting
      f_machine_arr.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

      // forming machines
      f_machine_arr.forEach((number) => {
        const q = query(
          ref,
          where("machine_no", "==", number),
          orderBy("time_end", "desc"),
          limit(1)
        );

        // check a machine is active or not
        getDocs(q).then((docs) => {
          let is_active = false;
          let idleTime = "N/A";

          docs.forEach((doc) => {
            let data = doc.data();
            let time_diff =
              Math.floor(new Date().getTime() / 1000) - data?.time_end;

            let hours = Math.floor(time_diff / 3600);
            let minutes = Math.floor((time_diff % 3600) / 60);
            let seconds = time_diff % 60;
            idleTime = `${hours ? `${hours}h` : ""}${
              minutes ? ` ${minutes}m` : ""
            } ${seconds}s`;

            if (time_diff <= threshold_sec) {
              is_active = true;
            }
          });

          setFormingMachine((prevFormingMachine) => [
            ...prevFormingMachine,
            {
              meta: "forming",
              machineNo: `${number}`,
              active: is_active,
              idleTime: idleTime,
            },
          ]);

          completedFetches += 1;

          // Set dataLoaded and dataAvailable once all machines have been processed
          if (completedFetches === totalMachines) {
            setDataLoaded(true);
            setDataAvailable(f_machine_arr.length !== 0);
          }
        });
      });
    });
  }, []);

  return (
    <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] p-8 rounded-lg">
      <h2 className="text-3xl">List of idle machine</h2>
      <div className="grid grid-cols-2 items-center gap-6 bg-primary rounded-full p-4 text-white mt-6">
        <p>Machine Names</p>
        <p>Idle Time</p>
        {/* <p>Last Active time</p> */}
      </div>
      {formingMachine
        ?.slice(0, 16)
        ?.filter((machine) => !machine?.active)
        ?.map((machine) => (
          <div className="grid grid-cols-2 items-center gap-6  rounded-full p-2 text-black mt-6">
            <p className="flex gap-2 items-center">
              <img src={Machine_Logo} alt="" className="w-10 h-10" />
              FM {machine?.machineNo}
            </p>
            <p>{machine?.idleTime}</p>
            {/* <p>11/11/2024 02:06 PM</p> */}
          </div>
        ))}
    </div>
  );
}
