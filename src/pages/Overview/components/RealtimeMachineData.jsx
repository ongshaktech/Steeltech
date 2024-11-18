

import Machine_Logo from "../../../assets/images/Machine_Logo.svg";

export default function RealtimeMachineData() {
  return (
    <div className='bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] p-8 rounded-lg'>
        <h2 className='text-3xl'>Real-Time Machine Data</h2>
        <div className="grid grid-cols-6 items-center gap-6 bg-primary rounded-full p-4 text-white mt-6">
            <p>Machine Names</p>
            <p>Status</p>
            <p>Shift</p>
            <p>Product Type</p>
            <p>Production weight</p>
            <p>Production Count</p>
        </div>
        <div className="grid grid-cols-6 items-center gap-6  rounded-full p-2 text-black mt-6">
            <p className="flex gap-2 items-center">
                <img src={Machine_Logo} alt="" className="w-10 h-10" />
                FM 01
            </p>
            <p>Active</p>
            <p>Morning</p>
            <p>Round Pipe, 3/8 inch,  0.4 mm</p>
            <p>30kg</p>
            <p>5</p>
        </div>
        <div className="grid grid-cols-6 items-center gap-6  rounded-full p-2 text-black mt-6">
            <p className="flex gap-2 items-center">
                <img src={Machine_Logo} alt="" className="w-10 h-10" />
                FM 01
            </p>
            <p>Active</p>
            <p>Morning</p>
            <p>Round Pipe, 3/8 inch,  0.4 mm</p>
            <p>30kg</p>
            <p>5</p>
        </div>
    </div>
  )
}
