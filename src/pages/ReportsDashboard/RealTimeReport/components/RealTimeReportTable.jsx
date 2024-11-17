import React from "react";
import { formatTime } from "../../../../utils/formatTime";

export default function RealTimeReportTable({ ReportData, startIndex }) {
  return (
    <div className="border border-gray-800 rounded-t-lg">
      <div className="border grid grid-cols-8 justify-between bg-primary text-white rounded-t-lg">
        <p className="w-full border-r border-r-gray-800 p-4">ID</p>
        <p className="w-full border-r border-r-gray-800 p-4">Machine Number</p>
        <p className="w-full border-r border-r-gray-800 p-4">Product Type</p>
        <p className="w-full border-r border-r-gray-800 p-4">Thickness</p>
        {/* <p className="w-full border-r border-r-gray-800 p-4">Dimension</p> */}
        <p className="w-full border-r border-r-gray-800 p-4">Product Count</p>
        <p className="w-full border-r border-r-gray-800 p-4">Total weight</p>
        <p className="w-full border-r border-r-gray-800 p-4">Shift</p>
        <p className="w-full p-4">Last Production Time</p>
      </div>
      {ReportData.map((item, index) => (
        <div
          key={item.id}
          className={`border border-gray-800 grid grid-cols-8  justify-between ${
            item?.status == "new" ? "bg-green-100" : ""
          }`}
        >
          <p className="w-full border-r border-r-gray-800 p-4">
            {index + 1 + parseInt(startIndex)}
          </p>
          <p className="w-full border-r border-r-gray-800 p-4">
            {item?.machine_no}
          </p>
          <p className="w-full border-r border-r-gray-800 p-4">
            {item?.product_type}
          </p>
          <p className="w-full border-r border-r-gray-800 p-4">
            {item?.thickness}
          </p>
          {/* <p className="w-full border-r border-r-gray-800 p-4">{item?.product_dimensions}</p> */}
          <p className="w-full border-r border-r-gray-800 p-4">
            {item?.count}{" "}
          </p>
          <p className="w-full border-r border-r-gray-800 p-4">
            {item?.weight} KG
          </p>
          <p className="w-full border-r border-r-gray-800 p-4">{item?.shift}</p>
          <p className="w-full p-4">
            {item["date"]}{" "}
            {`${item["time"].toString().slice(0, 2)}:${item["time"]
              .toString()
              .slice(2, 4)}:${item["time"].toString().slice(4, 6)}`}
          </p>
          {/* </div> */}
        </div>
      ))}
    </div>
  );
}
