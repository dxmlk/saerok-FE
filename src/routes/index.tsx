import { createBrowserRouter } from "react-router-dom";
import Test from "pages/Test";
import DexPage from "pages/DexPage";
import DexDetailPage from "pages/DexDetailPage";
import SearchPage from "pages/SearchPage";
import CollectionPage from "pages/CollectionPage";
import CollectionDetailPage from "pages/CollectionDetailPage";
import AddCollectionPage from "pages/AddCollectionPage";
import MapPage from "pages/MapPage";
import Layout from "components/common/Layout";

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
          path: "/dex-detail/:id",
          element: <DexDetailPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/collection",
          element: <CollectionPage />,
        },
        {
          path: "/collection-detail/:id",
          element: <CollectionDetailPage />,
        },
        {
          path: "/add-collection",
          element: <AddCollectionPage />,
        },
        {
          path: "/map",
          element: <MapPage />,
        },
      ],
    },
  ]);
};
