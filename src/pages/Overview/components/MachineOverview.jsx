import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import active_machine_analytics from "../../../assets/images/active_machine_analytics.svg"
import idle_machine_analytics from "../../../assets/images/idle_machine_analytics.svg"
import total_machine_analytics from "../../../assets/images/total_machine_analytics.svg"

export default function MachineOverview() {
  return (
    <div className="py-10 flex gap-10 items-center">
      <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] w-full p-4 rounded-lg flex flex-col gap-6" >
        <div className="flex gap-4 justify-between items-center">
          <p>Active Machines</p>
          <div className="flex gap-2 items-center text-[#2CF619]">
            <FaArrowTrendUp className="fill-[#2CF619]" />
            <p>+17%</p>
          </div>
        </div>
        <div className="flex gap-4 items-end  justify-between">
            <h2><span className="text-2xl font-bold">25</span> Machines Active</h2>
            <img src={active_machine_analytics} alt="" />
        </div>
      </div>
      <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] w-full p-4 rounded-lg flex flex-col gap-6" >
        <div className="flex gap-4 justify-between items-center">
          <p>Idle Machines</p>
          <div className="flex gap-2 items-center text-[#ED1C24]">
            <FaArrowTrendUp className="fill-[#ED1C24]" />
            <p>+17%</p>
          </div>
        </div>
        <div className="flex gap-4 items-end  justify-between">
            <h2><span className="text-2xl font-bold">12</span> Machines Idle</h2>
            <img src={idle_machine_analytics} alt="" />
        </div>
      </div>
      <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] w-full p-4 rounded-lg flex flex-col gap-6" >
        <div className="flex gap-4 justify-between items-center">
          <p>Total Current Production</p>
          <div className="flex gap-2 items-center text-[##16B1FF]">
            <FaArrowTrendUp className="fill-[##16B1FF]" />
            <p>+17%</p>
          </div>
        </div>
        <div className="flex gap-4 items-end  justify-between">
            <h2><span className="text-2xl font-bold">1300</span> kg</h2>
            <img src={total_machine_analytics} alt="" />
        </div>
      </div>
  
    </div>
  );
}
