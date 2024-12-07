import React from "react";
import { formatTime } from "../../../utils/formatTime";

export default function CoilChange({
  coilWeight,
  ReportData,
  handleWeightChange,
  handleUpdate,
}) {
  return (  
    <div className="border border-gray-600 rounded-t-lg">
      <div className="border flex gap-4 items-center justify-between p-4 bg-primary text-white rounded-t-lg">
        <p className="w-full">ID</p>
        <p className="w-full">Machine Number</p>
        <p className="w-full">Changed On</p>
        <p className="w-full">Coil Weight</p>
        <p className="w-full">Coil Weight</p>
      </div>
      {ReportData.map((item, index) => (
        <div
          key={item.id}
          className="border border-gray-600 flex gap-4 items-center justify-between p-4"
        >
          <p className="w-full">{index + 1}</p>
          <p className="w-full">FM {item?.machine_no}</p>
          <p className="w-full">{formatTime(item?.unix_time)}</p>
          <div className="w-full">
            <input
              className=" border px-4 py-2 rounded-md border-gray-500 outline-none focus:outline-none"
              type="text"
              placeholder="Enter coil weight"
              value={coilWeight[item.id] || ""}
              onChange={(e) => handleWeightChange(item.id, e.target.value)}
            />
          </div>
          <p className="w-full">
            <button
              onClick={(e) => handleUpdate(e, item.id)}
              className="bg-primary px-4 py-2 rounded-md text-white"
            >
              Update
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}
