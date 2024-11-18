import Machine_Logo from "../../../assets/images/Machine_Logo.svg";

export default function MachineAnalytics() {
  return (
    <div className="grid grid-cols-2 gap-8 mt-10">
      <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] p-8 rounded-lg">
        <h2 className="text-3xl">List of idle machine</h2>
        <div className="grid grid-cols-3 items-center gap-6 bg-primary rounded-full p-4 text-white mt-6">
          <p>Machine Names</p>
          <p>Idle Time</p>
          <p>Last Active time</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-6  rounded-full p-2 text-black mt-6">
          <p className="flex gap-2 items-center">
            <img src={Machine_Logo} alt="" className="w-10 h-10" />
            FM 01
          </p>
          <p>20 hrs</p>
          <p>11/11/2024 02:06 PM</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-6  rounded-full p-2 text-black mt-6">
          <p className="flex gap-2 items-center">
            <img src={Machine_Logo} alt="" className="w-10 h-10" />
            FM 01
          </p>
          <p>20 hrs</p>
          <p>11/11/2024 02:06 PM</p>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
