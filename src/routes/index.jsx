import { createBrowserRouter } from "react-router-dom";
import Machines from "../pages/Machines";
import Layout from "../shared/Layout";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Machines />,
      },
    ],
  },
]);
