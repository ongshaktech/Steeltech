import { createBrowserRouter } from "react-router-dom";
import Machines from "../pages/Machines/Machines";
import Layout from "../shared/Layout";
import TareAndCoil from "../pages/TareAndCoil/TareAndCoil";
import ReportsDashboard from "../pages/ReportsDashboard/ReportsDashboard";
import RealTimeReport from "../pages/ReportsDashboard/RealTimeReport/RealTimeReport";
import DailyReport from "../pages/ReportsDashboard/DailyReport/DailyReport";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Machines />,
      },
      {
        path: "/tare-crain-updates",
        element: <TareAndCoil />,
      },
      {
        path: "/reports/dashboard",
        element: <ReportsDashboard  />,
      },
      {
        path: "/reports/realtime-reports",
        element: <RealTimeReport  />,
      },
      {
        path: "/reports/daily-reports",
        element: <DailyReport  />,
      },
    ],
  },
]);
