import React from "react";
import { formatTime } from "../../../../utils/formatTime";

export default function RealTimeReportTable({ ReportData, startIndex }) {
  return (
    <>
      <div className="w-full relative overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary text-white font-light rounded-lg">
            <tr className=" rounded-tl-lg">
              <th className="border border-black p-2">ID</th>
              <th className="border border-black p-2">Machine Number</th>
              <th className="border border-black p-2">Product Type</th>
              <th className="border border-black p-2">Thickness</th>
              {/* <th className="border border-black p-2">Dimension</th> */}
              <th className="border border-black p-2">Product Count</th>
              <th className="border border-black p-2">Total weight</th>
              <th className="border border-black p-2">Shift</th>
              <th className="border border-black p-2">Last Production Time</th>
            </tr>
          </thead>
          <tbody>
            {ReportData.map((item, index) => (
              <tr
                key={item.id}
                className={` ${
                  item?.status == "new" ? "bg-green-100" : ""
                }`}
              >
                <td class="border border-black p-4">
                  {index + 1 + parseInt(startIndex)}
                </td>
                <td class="border border-black p-4">
                  {item?.machine_no}
                </td>
                <td class="border border-black p-4">
                  {item?.product_type}
                </td>
                <td class="border border-black p-4">
                  {item?.thickness}
                </td>
                <td class="border border-black p-4">
                  {item?.count}{" "}
                </td>
                <td class="border border-black p-4">
                  {item?.weight} KG
                </td>
                <td class="border border-black p-4">
                  {item?.shift}
                </td>
                <td className="border border-black p-4">
                  {item["date"]}{" "}
                  {`${item["time"].toString().slice(0, 2)}:${item["time"]
                    .toString()
                    .slice(2, 4)}:${item["time"].toString().slice(4, 6)}`}
                </td>
                {/* </div> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
