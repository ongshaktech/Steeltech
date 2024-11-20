import Steeltech_Logo from "../assets/images/Steeltech_Logo.svg";
import Forming_Machine from "../assets/images/Forming_Machine.svg";
import Graph from "../assets/images/Graph.svg";
// import Report from "../assets/images/Report.svg";
import Users from "../assets/images/Users.svg";
import { NavLink } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { TbReportSearch, TbSettingsCheck } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaAngleDown, FaAngleUp, FaArrowDown } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar() {
  let [showProductMenu, setShowProductMenu] = useState(false);
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
            {/* <img src={Forming_Machine} alt="" /> */}
            <RiDashboardFill className="w-6 h-6" />
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
            {/* <img src={Users} alt="" /> */}
            <TbReportSearch className="w-6 h-6" />
            <p className="">Reports</p>
          </div>
        </NavLink>
        <div
          className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer"
          onClick={() => setShowProductMenu(!showProductMenu)}
        >
          <img src={Forming_Machine} alt="" />
          <p className="">Manage Products</p>
          {showProductMenu ? <FaAngleUp /> : <FaAngleDown />}
        </div>

        {showProductMenu && (
          <div className="flex flex-col gap-3 pl-8">
            <NavLink
              to="/manage/products"
              className={({ isActive }) =>
                isActive ? "bg-primary rounded-md" : ""
              }
            >
              <p className="p-2 ">All Products</p>
            </NavLink>
            <NavLink
              to="/products/add-product"
              className={({ isActive }) =>
                isActive ? "bg-primary rounded-md" : ""
              }
            >
              <p className="p-2 ">Add Product</p>
            </NavLink>
            <NavLink
              to="/products/add-shift"
              className={({ isActive }) =>
                isActive ? "bg-primary rounded-md" : ""
              }
            >
              <p className="p-2 ">Add Shift</p>
            </NavLink>
            <NavLink
              to="/products/add-damaged-product"
              className={({ isActive }) =>
                isActive ? "bg-primary rounded-md" : ""
              }
            >
              <p className="p-2 ">Add Damaged Product</p>
            </NavLink>
          </div>
        )}

        <NavLink
          to="/manage/users"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md" : ""
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Users} alt="" />
            <p className="">Manage Users</p>
          </div>
        </NavLink>
        <NavLink
          to="/incharge"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md" : ""
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            {/* <img src={Users} alt="" /> */}
            <TbSettingsCheck className="w-6 h-6" />
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
            {/* <img src={Users} alt="" /> */}
            <CiSettings className="w-6 h-6" />
            <p className="">Tare & Coil Changing </p>
          </div>
        </NavLink>
        <NavLink
          to="/admin/machine-production"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md" : ""
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            {/* <img src={Users} alt="" /> */}
            <MdOutlineAdminPanelSettings className="w-6 h-6" />
            <p className="">Admin</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
