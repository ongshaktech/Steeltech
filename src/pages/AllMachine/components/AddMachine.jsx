import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db_firestore } from "../../../Hooks/config";

export default function AddMachine({ setShowAdd, setShowSuccess }) {
  let [msg, setMsg] = useState("");
  let [machine_no, setMachine_no] = useState(null);

  const setData = (e) => {
    e.preventDefault();

    if (machine_no !== "") {
     
      const ref = doc(db_firestore, `information`, "info");

      updateDoc(ref, {
        forming_machine: arrayUnion(machine_no),
      });
      setMachine_no(null);
      setShowSuccess(true)
      setShowAdd(false)
    } else {
      setMsg("Machine number cannot be empty!");
      return false;
    }
  };

  return (
    <form className="py-10" onSubmit={setData}>
      <h2 className="text-2xl pb-4 font-bold">Add Machine</h2>

      <label className="flex gap-6 items-center mb-6">
        <p className="w-[180px]">Machine No*</p>
        <input
          id=""
          type="number"
          name="machine_no"
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
          value={machine_no}
          onChange={(e) => setMachine_no(e.target.value)}
        />
      </label>

      {msg ? <span className="text-red-500">{msg}</span> : null}
      <div className="flex justify-center">

      <button className="btn-primary" type="submit">
        Add
      </button>
      </div>
    </form>
  );
}
