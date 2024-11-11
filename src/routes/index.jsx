import { createBrowserRouter } from "react-router-dom";
import Machines from "../pages/Machines/Machines";
import Layout from "../shared/Layout";
import TareAndCoil from "../pages/TareAndCoil/TareAndCoil";

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
    ],
  },
]);
