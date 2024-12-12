import React, { useEffect, useState } from "react";
import { useFirestore } from "../../Hooks/firebaseFuncs";
import ShiftForm from "./components/ShiftForm";
import SuccessMessage from "../../shared/SuccessMessage";

export default function AddShift() {
  let [shiftData, setShiftData] = useState({});

  const { updateDocument: updateShift, response } = useFirestore("shiftTime");
  let [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (Object.keys(shiftData).length !== 0) {
      updateShift(shiftData["shift"], shiftData);

    }
  }, [shiftData]);

  useEffect(() => {
    if (response?.success) {
      setShowSuccess(response?.success);
    }
  }, [response]);

  return (
    <div>
      <ShiftForm setShiftData={setShiftData} />

      {showSuccess && (
        <SuccessMessage
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          message="Shift updated successfully"
        />
      )}
    </div>
  );
}
