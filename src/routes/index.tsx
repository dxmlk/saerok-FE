import { createBrowserRouter } from "react-router-dom";
import Test from "pages/Test";
import DexPage from "pages/DexPage";
import DexDetailPage from "pages/DexDetailPage";
import SearchBirdPage from "pages/SearchBirdPage";
import SaerokPage from "pages/SaerokPage";
import SaerokDetailPage from "pages/SaerokDetailPage";
import AddSaerokPage from "pages/AddSaerokPage";
import MapPage from "pages/MapPage";
import Layout from "components/common/Layout";
import SearchLocationPage from "pages/SearchLocationPage";
import OnboardingPage from "pages/OnboardingPage";
import KakaoCallback from "servies/api/auth/KakaoCallback";
import RegisterPage from "pages/RegisterPage";

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <OnboardingPage />,
        },
        // {
        //   index: true,
        //   element: <Navigate to="/map" replace />,
        // },
        {
          path: "/register",
          element: <RegisterPage />,
        },
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
          path: "/search-bird",
          element: <SearchBirdPage />,
        },
        {
          path: "/saerok",
          element: <SaerokPage />,
        },
        {
          path: "/saerok-detail/:id",
          element: <SaerokDetailPage />,
        },
        {
          path: "/add-saerok",
          element: <AddSaerokPage />,
        },
        {
          path: "/map",
          element: <MapPage />,
        },
        {
          path: "/search-location",
          element: <SearchLocationPage />,
        },
        {
          path: "/oauth/kakao/callback",
          element: <KakaoCallback />,
        },
      ],
    },
  ]);
};
