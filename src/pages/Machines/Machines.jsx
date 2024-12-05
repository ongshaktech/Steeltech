import { useEffect, useState } from "react";
import MachinesHeading from "./components/MachinesHeading";
import Machine from "./components/Machine";
import {
  collection,
  getDoc,
  doc,
  orderBy,
  limit,
  where,
  query,
  getDocs,
} from "firebase/firestore";

import { db_firestore } from "../../Hooks/config";
import { Triangle } from "react-loader-spinner";
// import { Triangle } from "react-loader-spinner";

export default function Machines() {

  let [dataLoaded, setDataLoaded] = useState(false);
  let [dataAvailable, setDataAvailable] = useState(false);
  let [formingMachine, setFormingMachine] = useState([]);

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

  console.log("formingMachine", formingMachine)

  return (
    <div className="">
      <MachinesHeading setPortion={setPortion} portion={portion} />

      {/* {allMachines.map((item) => (
          <Machine />
        ))} */}
      {dataLoaded ? (
        dataAvailable ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {formingMachine?.slice(0, 16)
                ?.filter((machine) =>
                  portion === "all"
                    ? machine
                    : portion === "active"
                    ? machine?.active
                    : !machine?.active
                )
                ?.map((machine) => (
                  <Machine
                    meta="forming"
                    machineNo={machine?.machineNo}
                    active={machine?.active}
                    idleTime={machine?.idleTime}
                  />
                ))}
            </div>

            {/* <div>
              <h1>Polish Machine</h1>
              <div className="grid grid-cols-4 gap-2">{polishMachine}</div>
            </div> */}
          </>
        ) : (
          <h1>Please Wait</h1>
        )
      ) : (
        <div className="min-w-screen min-h-screen flex justify-center items-center">
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            visible={true}
          />
        </div>
      )}
    </div>
  );
}
