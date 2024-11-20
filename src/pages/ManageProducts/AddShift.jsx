import React, { useEffect, useState } from "react";
import { useFirestore } from "../../Hooks/firebaseFuncs";
import ShiftForm from "./components/ShiftForm";

export default function AddShift() {
  let [shiftData, setShiftData] = useState({});

  const { updateDocument: updateShift } = useFirestore("shiftTime");

  useEffect(() => {
    if (Object.keys(shiftData).length !== 0) {
      updateShift(shiftData["shift"], shiftData);
      setshowShiftModal(false);
    }
  }, [shiftData]);

  return (
    <div>
      <ShiftForm setShiftData={setShiftData} />
    </div>
  );
}
