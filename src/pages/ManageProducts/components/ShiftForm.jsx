import React, { useEffect, useRef, useState } from "react";
import { Shifts } from "../../../data/constants";
import { doc, getDoc } from "firebase/firestore";
import { db_firestore } from "../../../Hooks/config";

export default function ShiftForm({ setShiftData, setshowProductModal }) {
  let [msg, setMsg] = useState("");
  let [selectedShift, setSelectedShift] = useState(Shifts[0]);
  let [shiftInfo, setShiftInfo] = useState({});

  let starts = useRef("");
  let ends = useRef("");
  let shift = useRef("");

  const setData = (e) => {
    e.preventDefault();

    if (
      starts.current.value === "" ||
      ends.current.value === "" ||
      shift.current.value === ""
    ) {
      setMsg("Please fill up this form properly");
      return false;
    }

    // convert ends and starts to unix timestamp
    let startsTime = starts.current.valueAsNumber / 1000;
    let endsTime = ends.current.valueAsNumber / 1000;

    setShiftData({
      starts: startsTime,
      ends: endsTime,
      shift: shift.current.value,
    });

    setshowProductModal(false);
  };

  useEffect(() => {
    Shifts.forEach((shift) => {
      let ref = doc(db_firestore, `shiftTime`, shift);
      getDoc(ref).then((data) => {
        setShiftInfo((prev) => {
          return {
            ...prev,
            [shift]: data.data(),
          };
        });
      });
    });
  }, []);

  useEffect(() => {
    if (Object.keys(shiftInfo).length !== 0) {
      // HH:MM format
      let starts_hour = parseInt(shiftInfo[selectedShift].starts / 3600);
      let starts_min = parseInt((shiftInfo[selectedShift].starts % 3600) / 60);

      let ends_hour = parseInt(shiftInfo[selectedShift].ends / 3600);
      let ends_min = parseInt((shiftInfo[selectedShift].ends % 3600) / 60);

      starts.current.value = `${
        starts_hour < 9 ? `0${starts_hour}` : starts_hour
      }:${starts_min < 9 ? `0${starts_min}` : starts_min}`;

      ends.current.value = `${ends_hour < 9 ? `0${ends_hour}` : ends_hour}:${
        ends_min < 9 ? `0${ends_min}` : ends_min
      }`;
    }
  }, [selectedShift, shiftInfo]);

  return (
    <form className="flex flex-col gap-4" onSubmit={setData}>
      <h2 className="text-2xl font-bold pb-6">Choose Shift</h2>
      <label className="flex gap-6 items-center">
        <p className="w-[180px]">Machine No*</p>

        <select
          //   value={machine_no}
          //   onChange={(e) => setMachine_no(e.target.value)}
          ref={shift}
          onChange={(e) => setSelectedShift(e.target.value)}
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
        >
          <option selected disabled value="">
            Shift.
          </option>

          {Shifts.map((shift) => (
            <option value={shift}>{shift}</option>
          ))}
        </select>
      </label>
      <label className="flex gap-6 items-center">
        <p className="w-[180px]">Starts*</p>
        <input
          type="time"
          ref={starts}
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
        />
      </label>

      <label className="flex gap-6 items-center">
        <p className="w-[180px]">Ends*</p>
        <input
          type="time"
          ref={ends}
          className="w-full p-2 rounded-md border border-black outline-none focus:outline-none"
        />
      </label>

      <div className="flex justify-center">
        <button className="btn-primary " type="submit">
          Submit
        </button>
      </div>

      <span className="msgSpan">{msg}</span>
    </form>
  );
}
