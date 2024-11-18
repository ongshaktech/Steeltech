import Steeltech_Logo from "../assets/images/Steeltech_Logo.svg";
import Forming_Machine from "../assets/images/Forming_Machine.svg";
import Graph from "../assets/images/Graph.svg";
// import Report from "../assets/images/Report.svg";
import Users from "../assets/images/Users.svg";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="max-w-[240px] w-full min-h-screen border-r border-r-gray-500">
      <div className="w-full py-4 ">
        <img src={Steeltech_Logo} alt="" className="mx-auto" />
      </div>

      <div className="flex flex-col gap-4 px-4 mt-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md" : ""
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Forming_Machine} alt="" />
            <p className="">Overview</p>
          </div>
        </NavLink>
        <NavLink
          to="/machines"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md" : ""
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Forming_Machine} alt="" />
            <p className="">Forming Machine</p>
          </div>
        </NavLink>
        <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
          <img src={Graph} alt="" />
          <p className="">Graphs & Charts</p>
        </div>
        <NavLink
          to="/reports/dashboard"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md" : ""
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Users} alt="" />
            <p className="">Reports</p>
          </div>
        </NavLink>
        <NavLink
          to="/manage/products"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md" : ""
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Forming_Machine} alt="" />
            <p className="">Manage Products</p>
          </div>
        </NavLink>

        <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
          <img src={Users} alt="" />
          <p className="">Manage Users</p>
        </div>
        <NavLink
          to="/incharge"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md" : ""
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Users} alt="" />
            <p className="">Incharge Section</p>
          </div>
        </NavLink>
        <NavLink
          to="/tare-crain-updates"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md" : ""
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Users} alt="" />
            <p className="">Tare & Coil Changing </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
