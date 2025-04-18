import { createBrowserRouter } from "react-router-dom";
import Test from "pages/Test";
import DexPage from 'pages/DexPage';
import Layout from "components/common/Layout";
import DexDetailPage from "pages/DexDetailPage";

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout />, // Layout을 최상위 route element로 설정
      children: [
        {
          path: "/test",
          element: <Test />,
        },
        {
          path: "/dex",
          element: <DexPage />,
        },
        {
          path: "/dexdetail",
          element: <DexDetailPage />,
        },
      ]
    }
  ])
};
