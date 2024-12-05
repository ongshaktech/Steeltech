import Steeltech_Logo from "../assets/images/Steeltech_Logo.svg";
import Forming_Machine from "../assets/images/Forming_Machine.svg";
import Overview_Black from "../assets/images/Overview_Black.svg";
import Overview_White from "../assets/images/Overview_White.svg";
import Report_Black from "../assets/images/Report_Black.svg";
import Report_White from "../assets/images/Report_White.svg";
import Forming_Machine_white from "../assets/images/Forming_Machine_white.svg";
import Graph from "../assets/images/Graph.svg";
// import Report from "../assets/images/Report.svg";
import Users from "../assets/images/Users.svg";
import Users_White from "../assets/images/Users_White.svg";
import Incharge_Black from "../assets/images/Incharge_Black.svg";
import Incharge_White from "../assets/images/Incharge_White.svg";
import Tare__Coil_White from "../assets/images/Tare_&_Coil_White.svg";
import Tare__Coil_Black from "../assets/images/Tare_&_Coil_Black.svg";
import Admin_Black from "../assets/images/Admin_Black.svg";
import Admin_White from "../assets/images/Admin_White.svg";
import { NavLink } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { TbReportSearch, TbSettingsCheck } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaAngleDown, FaAngleUp, FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import { GiVendingMachine } from "react-icons/gi";

export default function Sidebar() {
  let [showProductMenu, setShowProductMenu] = useState(false);
  return (
    <div className="w-full md:max-w-[240px] md:min-w-[240px] w-full md:min-h-screen border-r border-r-gray-500">
      <div className="w-full py-4 ">
        <img src={Steeltech_Logo} alt="" className="mx-auto" />
      </div>

      <div className="flex flex-col gap-4 px-4 mt-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md hidden" : "block"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Overview_Black} alt="" />
            {/* <RiDashboardFill className="w-6 h-6" /> */}
            <p className="">Overview</p>
          </div>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md block text-white" : "hidden"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Overview_White} alt="" />
            {/* <RiDashboardFill className="w-6 h-6" /> */}
            <p className="">Overview</p>
          </div>
        </NavLink>
        <NavLink
          to="/machines"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md hidden" : "block"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Forming_Machine} alt="" />
            <p className="">Forming Machine</p>
          </div>
        </NavLink>
        <NavLink
          to="/machines"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md block text-white" : "hidden"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Forming_Machine_white} alt="" />
            <p className="">Forming Machine</p>
          </div>
        </NavLink>
        {/* <NavLink
          to="/graph-charts"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md block text-white" : "hidden"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Graph} alt="" />
            <p className="">Graphs & Charts</p>
          </div>
        </NavLink>
        <NavLink
          to="/graph-charts"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md hidden" : "block"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Graph} alt="" />
            <p className="">Graphs & Charts</p>
          </div>
        </NavLink> */}
        <NavLink
          to="/reports/dashboard"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md hidden" : "block"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Report_Black} alt="" />
            {/* <TbReportSearch className="w-6 h-6" /> */}
            <p className="">Reports</p>
          </div>
        </NavLink>
        <NavLink
          to="/reports/dashboard"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md block text-white" : "hidden"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Report_White} alt="" />
            {/* <TbReportSearch className="w-6 h-6" /> */}
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
          to="/manage/all-machines"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md hidden" : "block"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Forming_Machine} alt="" />
            {/* <GiVendingMachine className="w-6 h-6" /> */}
            <p className="">All Machines</p>
          </div>
        </NavLink>
        <NavLink
          to="/manage/all-machines"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md block text-white" : "hidden"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Forming_Machine_white} alt="" />
            {/* <GiVendingMachine className="w-6 h-6" /> */}
            <p className="">All Machines</p>
          </div>
        </NavLink>
        <NavLink
          to="/manage/users"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md hidden" : "block"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Users} alt="" />
            <p className="">Manage Users</p>
          </div>
        </NavLink>
        <NavLink
          to="/manage/users"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md block text-white" : "hidden"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Users_White} alt="" />
            <p className="">Manage Users</p>
          </div>
        </NavLink>

        <NavLink
          to="/incharge"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md hidden" : "block"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Incharge_Black} alt="" />
            {/* <TbSettingsCheck className="w-6 h-6" /> */}
            <p className="">Incharge Section</p>
          </div>
        </NavLink>
        <NavLink
          to="/incharge"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md block text-white" : "hidden"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Incharge_White} alt="" />
            {/* <TbSettingsCheck className="w-6 h-6" /> */}
            <p className="">Incharge Section</p>
          </div>
        </NavLink>
        <NavLink
          to="/tare-crain-updates"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md hidden" : "block"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Tare__Coil_Black} alt="" />
            {/* <CiSettings className="w-6 h-6" /> */}
            <p className="">Tare & Coil Changing </p>
          </div>
        </NavLink>
        <NavLink
          to="/tare-crain-updates"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md block text-white" : "hidden"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Tare__Coil_White} alt="" />
            {/* <CiSettings className="w-6 h-6" /> */}
            <p className="">Tare & Coil Changing </p>
          </div>
        </NavLink>
        <NavLink
          to="/admin/machine-production"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md hidden" : "block"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Admin_Black} alt="" />
            {/* <MdOutlineAdminPanelSettings className="w-6 h-6" /> */}
            <p className="">Admin</p>
          </div>
        </NavLink>
        <NavLink
          to="/admin/machine-production"
          className={({ isActive }) =>
            isActive ? "bg-primary rounded-md block text-white" : "hidden"
          }
        >
          <div className="flex gap-3 items-center px-2 py-2 rounded-md hover:bg-primary cursor-pointer">
            <img src={Admin_White} alt="" />
            {/* <MdOutlineAdminPanelSettings className="w-6 h-6" /> */}
            <p className="">Admin</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
