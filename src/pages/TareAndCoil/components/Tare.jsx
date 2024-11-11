import React from "react";
import { formatTime } from "../../../utils/formatTime";

export default function Tare({ ReportData }) {
  return (
    <div className="border border-gray-600 rounded-t-lg">
      <div className="border flex gap-4 items-center justify-between p-4 bg-primary text-white rounded-t-lg">
        <p className="w-full">ID</p>
        <p className="w-full">Machine Number</p>
        <p className="w-full">Tared On</p>
      </div>
      {ReportData.map((item, index) => (
        <div
          key={item.id}
          className="border border-gray-600 flex gap-4 items-center justify-between p-4"
        >
          {/* <hr className="divider" /> */}
          {/* <div className="table_content"> */}
            <p className="w-full">{index + 1}</p>
            <p className="w-full">FM {item?.machine_no}</p>
            <p className="w-full">{formatTime(item?.unix_time)}</p>
          {/* </div> */}
        </div>
      ))}
    </div>
  );
}
