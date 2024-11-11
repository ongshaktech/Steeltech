import React from "react";

export default function MachinesHeading({ setPortion, portion }) {
  return (
    <div className="flex gap-10 items-center justify-between pb-6">
      <h2 className="text-4xl font-sans font-medium">Forming Machine</h2>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox" 
            name="fAll"
            id="fAll"
            className="w-4 h-4"
            checked={portion == "all"}
            onClick={() => setPortion("all")}
          />
          <label htmlFor="fAll" className="text-xl">
            All
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox" 
            name="fActive"
            id="fActive"
            className="w-4 h-4"
            checked={portion == "active"}
            onClick={() => setPortion("active")}
          />
          <label htmlFor="fActive" className="text-xl">
            Active
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox" 
            name="fIdle"
            id="fIdle"
            className="w-4 h-4"
            checked={portion == "idle"}
            onClick={() => setPortion("idle")}
          />
          <label htmlFor="fIdle" className="text-xl">
            Idle
          </label>
        </div>
      </div>
    </div>
  );
}
