import React, { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import active_machine_analytics from "../../../assets/images/active_machine_analytics.svg";
import idle_machine_analytics from "../../../assets/images/idle_machine_analytics.svg";
import total_machine_analytics from "../../../assets/images/total_machine_analytics.svg";
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

export default function MachineOverview() {
  let [dataLoaded, setDataLoaded] = useState(false);
  let [dataAvailable, setDataAvailable] = useState(false);
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

  useEffect(() => {
    let activeMachines = formingMachine
      ?.slice(0, 16)
      ?.filter((machine) => machine?.active)?.length;
    let idleMachines = formingMachine
      ?.slice(0, 16)
      ?.filter((machine) => !machine?.active)?.length;

    setActiveMachine(activeMachines);
    setInActiveMachine(idleMachines);
  }, [formingMachine]);

  return (
    <div className="py-10 flex gap-10 items-center">
      <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] w-full p-4 rounded-lg flex flex-col gap-6">
        <div className="flex gap-4 justify-between items-center">
          <p>Active Machines</p>
          <div className="flex gap-2 items-center text-[#2CF619]">
            <FaArrowTrendUp className="fill-[#2CF619]" />
            <p>+17%</p>
          </div>
        </div>
        <div className="flex gap-4 items-end  justify-between">
          <h2>
            <span className="text-2xl font-bold">{activeMachine}</span> Machines
            Active
          </h2>
          <img src={active_machine_analytics} alt="" />
        </div>
      </div>
      <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] w-full p-4 rounded-lg flex flex-col gap-6">
        <div className="flex gap-4 justify-between items-center">
          <p>Idle Machines</p>
          <div className="flex gap-2 items-center text-[#ED1C24]">
            <FaArrowTrendUp className="fill-[#ED1C24]" />
            <p>+17%</p>
          </div>
        </div>
        <div className="flex gap-4 items-end  justify-between">
          <h2>
            <span className="text-2xl font-bold">{inActiveMachine}</span>{" "}
            Machines Idle
          </h2>
          <img src={idle_machine_analytics} alt="" />
        </div>
      </div>
      <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] w-full p-4 rounded-lg flex flex-col gap-6">
        <div className="flex gap-4 justify-between items-center">
          <p>Total Current Production</p>
          <div className="flex gap-2 items-center text-[##16B1FF]">
            <FaArrowTrendUp className="fill-[##16B1FF]" />
            <p>+17%</p>
          </div>
        </div>
        <div className="flex gap-4 items-end  justify-between">
          <h2>
            <span className="text-2xl font-bold">1300</span> kg
          </h2>
          <img src={total_machine_analytics} alt="" />
        </div>
      </div>
    </div>
  );
}
