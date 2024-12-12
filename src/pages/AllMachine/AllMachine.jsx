import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db_firestore } from "../../Hooks/config";
import { CiCirclePlus } from "react-icons/ci";
import AddMachine from "./components/AddMachine";
import SuccessMessage from "../../shared/SuccessMessage";

export default function AllMachine() {
  const [showAdd, setShowAdd] = useState(false);
  let [formingMachines, setFormingMachines] = useState([]);
  let [showSuccess, setShowSuccess] = useState(false);

  //  *********************************** Update Data **********************************

  // useEffect(() => {
  //     const ref = doc(db_firestore, `information`, 'info');

  //     if (!(Object.keys(polishMachineData).length === 0 && polishMachineData.constructor === Object)) {
  //         updateDoc(ref, {
  //             polish_machine: arrayUnion(polishMachineData['machine_no'].toString())
  //         });
  //     }
  // }, [polishMachineData]);

  // **************************** Fetch and insert data to div **************************
  useEffect(() => {
    const ref = doc(db_firestore, `information`, "info");

    // getDoc(ref).then(
    onSnapshot(ref, (data) => {
      const machines = data.data();
      let forming_machines = [];
      let polish_machines = [];

      machines["forming_machine"].forEach((num, index) => {
        forming_machines.push(num);
      });

      // machines['polish_machine'].forEach((num, index) => {
      //     polish_machines.push(
      //         <div className={style.listElements} key={index}>
      //             <span>{num}</span>
      //         </div>
      //     );
      // });

      setFormingMachines(forming_machines);
      // setPolishMachines(polish_machines);
    });
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold py-6">Forming Machines</h2>
      <div className="flex justify-between items-center gap-4 mb-8 mr-10">
        <h2>List of Machines</h2>
        <button
          className="bg-primary px-4 py-2 rounded-full text-white flex gap-2 items-center"
          onClick={() => {
            setShowAdd(!showAdd);
          }}
        >
          Add Product
          <CiCirclePlus className="w-6 h-6" />
        </button>
      </div>
      {showAdd ? <AddMachine setShowAdd={setShowAdd} setShowSuccess={setShowSuccess}/> : null}

      {showSuccess && (
        <SuccessMessage
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          message="Machine added successfully"
        />
      )}

      <div className="flex flex-wrap gap-4 items-center">
        {formingMachines?.map((machine) => (
          <div className="px-6 py-2 rounded-xl border border-black">
            FM {machine}
          </div>
        ))}
      </div>
    </div>
  );
}
