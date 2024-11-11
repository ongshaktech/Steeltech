import React from "react";
import { formatTime } from "../../../utils/formatTime";

export default function CoilChange({
  coilWeight,
  ReportData,
  handleWeightChange,
  handleUpdate,
}) {
  return (
    <div>
      <div className="table_heading">
        <p>ID</p>
        <p>Machine Number</p>
        <p>Changed On</p>
        <p>Coil Weight</p>
      </div>
      {ReportData.map((item, index) => (
        <span key={item.id}>
          <hr className="divider" />
          <div className="table_content">
            <p>{index + 1}</p>
            <p>{item?.machine_no}</p>
            <p>{formatTime(item?.unix_time)}</p>
            <p>
              <input
                className="coil-update-input"
                type="text"
                placeholder="Enter coil weight"
                value={coilWeight[item.id] || ""}
                onChange={(e) => handleWeightChange(item.id, e.target.value)}
              />
              <button
                onClick={(e) => handleUpdate(e, item.id)}
                className="coil-update-button"
              >
                Update
              </button>
            </p>
          </div>
        </span>
      ))}
    </div>
  );
}
