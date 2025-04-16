import { createBrowserRouter } from "react-router-dom";
import Test from "pages/Test";

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/test",
      element: <Test />,
    },
  ]);
};
