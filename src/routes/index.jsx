import { createBrowserRouter } from "react-router-dom";
import Machines from "../pages/Machines/Machines";
import Layout from "../shared/Layout";
import TareAndCoil from "../pages/TareAndCoil/TareAndCoil";
import ReportsDashboard from "../pages/ReportsDashboard/ReportsDashboard";
import RealTimeReport from "../pages/ReportsDashboard/RealTimeReport/RealTimeReport";
import DailyReport from "../pages/ReportsDashboard/DailyReport/DailyReport";
import WeeklyReport from "../pages/ReportsDashboard/WeeklyReport/WeeklyReport";
import MonthlyReport from "../pages/ReportsDashboard/MonthlyReport/MonthlyReport";
import QuarterlyReport from "../pages/ReportsDashboard/QuarterlyReport/QuarterlyReport";
import YearlyReport from "../pages/ReportsDashboard/YearlyReport/YearlyReport";
import MachineEfficiency from "../pages/ReportsDashboard/MachineEfficiency/MachineEfficiency";
import Overview from "../pages/Overview/Overview";
import ManageProducts from "../pages/ManageProducts/ManageProducts";
import Incharge from "../pages/Incharge/Incharge";
import AdminMachineDetails from "../pages/Admin/AdminMachineDetails";
import { ProtectedRoute } from "../Authentication/ProtectedRoute";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ProductForm from "../pages/ManageProducts/components/ProductForm";
import AddProduct from "../pages/ManageProducts/AddProduct";
import AddShift from "../pages/ManageProducts/AddShift";
import AddDamangedProduct from "../pages/ManageProducts/AddDamagedProduct";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "/machines",
        element: <Machines />,
      },
      {
        path: "/tare-crain-updates",
        element: <TareAndCoil />,
      },
      {
        path: "/reports/dashboard",
        element: <ReportsDashboard />,
      },
      {
        path: "/reports/realtime-reports",
        element: (
          <ProtectedRoute permission="manageRealtime">
            <RealTimeReport />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reports/daily-reports",
        element: <DailyReport />,
      },
      {
        path: "/reports/weekly-reports",
        element: <WeeklyReport />,
      },
      {
        path: "/reports/monthly-reports",
        element: <MonthlyReport />,
      },
      {
        path: "/reports/quarterly-reports",
        element: <QuarterlyReport />,
      },
      {
        path: "/reports/yearly-reports",
        element: <YearlyReport />,
      },
      {
        path: "/reports/machine-efficiency",
        element: <MachineEfficiency />,
      },
      {
        path: "/manage/products",
        element: <ManageProducts />,
      },
      {
        path: "/products/add-product",
        element: <AddProduct />,
      },
      {
        path: "/products/add-shift",
        element: <AddShift />,
      },
      {
        path: "/products/add-damaged-product",
        element: <AddDamangedProduct />,
      },
      {
        path: "/manage/users",
        element: <ManageUsers />,
      },
      {
        path: "/incharge",
        element: <Incharge />,
      },
      {
        path: "/admin/machine-production",
        element: <AdminMachineDetails />,
      },
    ],
  },
]);
