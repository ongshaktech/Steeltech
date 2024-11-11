import React from "react";
import { formatTime } from "../../../utils/formatTime";

export default function Tare({ ReportData }) {
  return (
    <div>
      <div className="table_heading">
        <p>ID</p>
        <p>Machine Number</p>
        <p>Tared On</p>
      </div>
      {ReportData.map((item, index) => (
        <span key={item.id}>
          <hr className="divider" />
          <div className="table_content">
            <p>{index + 1}</p>
            <p>{item?.machine_no}</p>
            <p>{formatTime(item?.unix_time)}</p>
          </div>
        </span>
      ))}
    </div>
  );
}
