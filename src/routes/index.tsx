import { createBrowserRouter } from "react-router-dom";
import Test from "pages/Test";
import DexPage from "pages/DexPage";
import DexDetailPage from "pages/DexDetailPage";
import SearchDexPage from "pages/SearchDexPage";
import SearchBirdPage from "pages/SearchBirdPage";
import SaerokPage from "pages/SaerokPage";
import SaerokDetailPage from "pages/SaerokDetailPage";
import AddSaerokPage from "pages/AddSaerokPage";
import MapPage from "pages/MapPage";
import Layout from "components/common/Layout";
import SearchPlacePage from "pages/SearchPlacePage";
import OnboardingPage from "pages/OnboardingPage";
import KakaoCallback from "services/api/auth/KakaoCallback";
import RegisterPage from "pages/RegisterPage";
import MyPage from "pages/MyPage";
import ProtectedRoute from "components/common/ProtectedRoute";

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
          path: "/search/dex",
          element: <SearchDexPage />,
        },
        {
          path: "/saerok",
          element: (
            <ProtectedRoute>
              <SaerokPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/saerok-detail/:id",
          element: (
            <ProtectedRoute>
              <SaerokDetailPage />
            </ProtectedRoute>
          ),
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
          path: "/mypage",
          element: <MyPage />,
        },
        {
          path: "/search/bird",
          element: <SearchBirdPage />,
        },
        {
          path: "/search/place",
          element: <SearchPlacePage />,
        },
        {
          path: "/auth/kakao/login",
          element: <KakaoCallback />,
        },
      ],
    },
  ]);
};
